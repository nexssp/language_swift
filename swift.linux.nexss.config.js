let languageConfig = Object.assign({}, require(`./swift.win32.nexss.config`));
languageConfig.compilers = {
  apt: {
    // Ubuntu
    install: `apt install clang libcurl3 libpython2.7 libpython2.7-dev
wget https://swift.org/builds/swift-5.2.5-release/ubuntu1804/swift-5.2.5-RELEASE/swift-5.2.5-RELEASE-ubuntu18.04.tar.gz
tar xzf swift-5.2.5-RELEASE-ubuntu18.04.tar.gz
sudo mv swift-5.2.5-RELEASE-ubuntu18.04 /usr/share/swift
echo "export PATH=/usr/share/swift/usr/bin:$PATH" >> ~/.bashrc
rm swift-5.2.5-RELEASE-ubuntu18.04.tar.gz
source  ~/.bashrc`, // Not working yet on Windows
    command: "swiftc",
    args: "<file>",
    help: ``,
  },
};
module.exports = languageConfig;
