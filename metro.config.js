// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith("graphql-request")) {
        return {
          filePath: `${__dirname}/node_modules/graphql-request/build/esm/index.js`,
          type: "sourceFile",
        };
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};
