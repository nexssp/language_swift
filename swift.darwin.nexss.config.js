let languageConfig = Object.assign({}, require(`./swift.linux.nexss.config`));
languageConfig.compilers = {
  macOS: {
    install:
      "echo Swift MacOS is not yet implemented. Please consider installing it manually.", // Make installer
    command: "swift",
    args: "<file>",
    help: ``,
  },
};
module.exports = languageConfig;
