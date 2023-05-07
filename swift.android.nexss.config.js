let languageConfig = Object.assign({}, require("./swift.linux.nexss.config"));

const distName = process.distro;
languageConfig.dist = distName;

languageConfig.compilers = {
  swift: {
    install: `pkg install -y swift`,
    command: "swift",
    args: "<file>",
    help: ``,
  },
};

module.exports = languageConfig;
