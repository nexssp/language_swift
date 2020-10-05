let languageConfig = Object.assign(
  {},
  require(`../config.${process.platform}`)
);

const os = require("@nexssp/os");
const distName = os.name();
const distVersion = os.v();
languageConfig.dist = distName;
let sudo = os.sudo();

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

let swiftPack =
  "https://github.com/apple/swift/archive/swift-5.3-RELEASE.tar.gz";

// Works on UBUNTU?
swiftPack =
  "https://swift.org/builds/swift-5.3-release/ubuntu1804/swift-5.3-RELEASE/swift-5.3-RELEASE-ubuntu18.04.tar.gz";

let deps =
  "wget clang libxml2 libcurl4 libncurses? libpython2.7 libpython2.7-dev";
// ==========================================

// ==========================================

let depsRemove = "";

switch (distName) {
  case os.distros.ALPINE:
    deps = "wget clang libxml2 libcurl ncurses-libs python2";
    // depsRemove = "apk del libc6-dbg"; //
    break;
  case os.distros.UBUNTU:
    deps =
      "wget clang libxml2 libcurl4 libncurses-dev libpython2.7 libpython2.7-dev";
    if (distVersion > 20) {
      swiftPack =
        "https://swift.org/builds/swift-5.3-release/ubuntu2004/swift-5.3-RELEASE/swift-5.3-RELEASE-ubuntu20.04.tar.gz";
    } else if (distVersion > 18) {
      swiftPack =
        "https://swift.org/builds/swift-5.3-release/ubuntu1804/swift-5.3-RELEASE/swift-5.3-RELEASE-ubuntu18.04.tar.gz";
    } else {
      swiftPack =
        "https://swift.org/builds/swift-5.3-release/ubuntu1604/swift-5.3-RELEASE/swift-5.3-RELEASE-ubuntu16.04.tar.gz";
    }
    break;
  case os.distros.AMAZON:
    swiftPack =
      "https://swift.org/builds/swift-5.3-release/amazonlinux2/swift-5.3-RELEASE/swift-5.3-RELEASE-amazonlinux2.tar.gz";
    break;
  case os.distros.CENTOS:
    if (distVersion >= 8) {
      swiftPack =
        "https://swift.org/builds/swift-5.3-release/centos8/swift-5.3-RELEASE/swift-5.3-RELEASE-centos8.tar.gz";
    } else {
      swiftPack =
        "https://swift.org/builds/swift-5.3-release/centos7/swift-5.3-RELEASE/swift-5.3-RELEASE-centos7.tar.gz";
    }

    break;
  default:
    break;
}

const fileName = require("path").basename(swiftPack);

languageConfig.compilers = {
  apt: {
    // Ubuntu
    install: os.replacePMByDistro(`${sudo}apt install -y ${deps}
if [ ! -f ${
      process.env.NEXSS_APPS_PATH
    }/${fileName} ];then wget ${swiftPack} -P ${
      process.env.NEXSS_APPS_PATH
    } ; fi
${sudo}mkdir -p /usr/share/swift
${sudo}tar xzf ${
      process.env.NEXSS_APPS_PATH
    }/${fileName} -C /usr/share/swift --strip-components 1
echo "Please reload your bash profile: '. ~/.bashrc' OR 'source ~/.bashrc'"${
      depsRemove ? "\n" + depsRemove : ""
    }
. ~/.bashrc
${sudo}ln -sf /usr/share/swift/usr/bin/swift /usr/bin/swift`), // Not working yet on Windows
    command: "swift",
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.swift.errors");
languageConfig.languagePackageManagers = {
  // TODO:
};

// TODO: Later to cleanup this config file !!
switch (distName) {
  case "Arch Linux":
    // ADD LATER TO TOP!!! pacman -Sy binutils fakeroot sudo --noconfirm --needed
    // ADD LATER TO TOP!!! pacman -Sy binutils fakeroot sudo --noconfirm --needed
    languageConfig.compilers.apt.install = `${sudo}pacman -Sy pkgconf binutils python python-pip fakeroot sudo --noconfirm --needed
if [ ! -d "/home/nexss" ]; then ${sudo}mkdir -p /home/nexss; fi
if [ ! id "nexss"] &>/dev/null; then ${sudo}useradd nexss && ${sudo}usermod -d /home/nexss -m nexss; fi
${sudo}chown -R nexss:nexss /home/nexss
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
    languageConfig.compilers.apt.install = os.replacePMByDistro(
      languageConfig.compilers.apt.install
    );
    // +
    //         `
    // cd /usr/share/swift/utils
    // ./update-checkout --clone`
    //     );
    break;
}
module.exports = languageConfig;
