const path = require("path");

// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
  devServer: {
    proxy: {
      "/dev-api/": {
        logLevel: "debug",
        changeOrigin: true,
        target: "https://demo.wiris.com/", // 需要请求的目标接口
        pathRewrite: {
          "^/dev-api/": "",
        },
      },
    },
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/styles/global.less")],
    });
}
