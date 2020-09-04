let languageConfig = Object.assign({}, require(`./swift.linux.nexss.config`));
languageConfig.compilers = {
  macOS: {
    install: "installed", // Not working yet on Windows
    command: "swift",
    args: "<file>",
    help: ``,
  },
};
module.exports = languageConfig;
