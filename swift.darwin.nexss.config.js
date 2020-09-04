let languageConfig = Object.assign({}, require(`./swift.win32.nexss.config`));
languageConfig.compilers = {
  macOS: {
    install: "installed", // Not working yet on Windows
    command: "swift",
    args: "<file>",
    help: ``,
  },
};
module.exports = languageConfig;
