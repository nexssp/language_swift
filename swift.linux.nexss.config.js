let languageConfig = Object.assign(
  {},
  require(`../config.${process.platform}`)
);
languageConfig.title = "Swift";
languageConfig.description =
  "The powerful programming language that is also easy to learn.";
languageConfig.url = "https://nodejs.org";
languageConfig.founders = ["Chris Lattner", "Apple Inc."];
languageConfig.years = ["2014"];
languageConfig.extensions = [".swift"];
languageConfig.executeCommandLine = "";
languageConfig.printCommandLine = "";
languageConfig.checkSyntax = "";
languageConfig.interactiveShell = "";
languageConfig.builders = {};

let sudo = "sudo ";
if (process.getuid && process.getuid() === 0) {
  sudo = "";
}
languageConfig.compilers = {
  apt: {
    // Ubuntu
    install: `${sudo}apt install -y clang libcurl3 libpython2.7 libpython2.7-dev
  wget https://swift.org/builds/swift-5.2.5-release/ubuntu1804/swift-5.2.5-RELEASE/swift-5.2.5-RELEASE-ubuntu18.04.tar.gz
  tar xzf swift-5.2.5-RELEASE-ubuntu18.04.tar.gz
  ${sudo}mv swift-5.2.5-RELEASE-ubuntu18.04 /usr/share/swift
  grep -qxF 'export PATH="/usr/share/swift/usr/bin/:$PATH"' ~/.bashrc || echo 'export PATH="/usr/share/swift/usr/bin/:$PATH"' >> ~/.bashrc
  rm swift-5.2.5-RELEASE-ubuntu18.04.tar.gz
  ${sudo}apt remove -y libc6-dbg # This needs to be here due to error: ld-2.27.so 0x7fffffff0005c587: adding range [0x1469a-0x1470a) which has a base that is less than the function's low PC 0x14e10
  . ~/.bashrc`, // Not working yet on Windows
    command: "swift",
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.swift.errors");
languageConfig.languagePackageManagers = {
  // TODO:
};
if (process.platform === "linux") {
  const {
    replaceCommandByDist,
    dist,
  } = require(`${process.env.NEXSS_SRC_PATH}/lib/osys`);

  const distName = dist();
  languageConfig.dist = distName;

  // TODO: Later to cleanup this config file !!
  switch (distName) {
    case "Arch Linux":
      // ADD LATER TO TOP!!! pacman -Sy binutils fakeroot sudo --noconfirm --needed
      // ADD LATER TO TOP!!! pacman -Sy binutils fakeroot sudo --noconfirm --needed
      languageConfig.compilers.apt.install = `pacman -Sy binutils python python-pip fakeroot sudo --noconfirm --needed
if [ ! -d "/home/nexss" ]; then mkdir -p /home/nexss; fi
if [ ! id "nexss"] &>/dev/null; then useradd nexss && usermod -d /home/nexss -m nexss; fi
chown -R nexss:nexss /home/nexss; 
grep -qxF 'nexss ALL=NOPASSWD: ALL' /etc/sudoers || echo 'nexss ALL=NOPASSWD: ALL' >> /etc/sudoers
cd /home/nexss
rm -rf package-query
rm -rf yaourt.git
sudo -u nexss git clone https://aur.archlinux.org/package-query.git
cd package-query
yes | sudo -u nexss makepkg -si
cd ..
sudo -u nexss git clone https://aur.archlinux.org/yaourt.git
cd yaourt
yes | sudo -u nexss makepkg -si
cd ..
sudo -u nexss yaourt -S --noconfirm swift-bin`; // swift
      break;
    default:
      languageConfig.compilers.apt.install = replaceCommandByDist(
        languageConfig.compilers.apt.install
      );
      break;
  }
}

module.exports = languageConfig;
