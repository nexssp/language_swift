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
languageConfig.licenses = [
  "MIT https://github.com/nodejs/node/blob/master/LICENSE",
];

languageConfig.executeCommandLine = "";
languageConfig.printCommandLine = "";
languageConfig.checkSyntax = "";
languageConfig.interactiveShell = "swift";
languageConfig.builders = {};
languageConfig.compilers = {
  apt: {
    install: "scoop install swift", // Not working yet on Windows
    command: "swiftc",
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.swift.errors");
languageConfig.languagePackageManagers = {
  // TODO:
  npm: {
    installation: "installed.",
    messageAfterInstallation: null, // sometimes there is need of add something to the files can be add here eg php for composer.
    installed: "npm list",
    search: "npm search",
    install: "npm install",
    uninstall: "npm remove",
    help: "npm help",
    version: "npm --version",
    init: () => {
      if (
        !require("fs").existsSync(
          require("path").join(process.cwd(), "package.json")
        )
      ) {
        require("child_process").execSync("npm init -y", { stdio: "inherit" });
        console.log("initialized npm project.");
      } else {
        console.log("npm already initialized.");
      }
    },
    // if command not found in specification
    // run directly on package manager
    else: "npm",
  },
};

module.exports = languageConfig;
