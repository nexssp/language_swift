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
apt remove libc6-dbg # This needs to be here due to error: ld-2.27.so 0x7fffffff0005c587: adding range [0x1469a-0x1470a) which has a base that is less than the function's low PC 0x14e10
. ~/.bashrc`, // Not working yet on Windows
    command: "swift",
    args: "<file>",
    help: ``,
  },
};
module.exports = languageConfig;
