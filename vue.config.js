// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("api", resolve("src/api"))
      .set("components", resolve("src/components"))
      .set("common", resolve("src/common"))
      .set("pages", resolve("src/pages"))
      .set("router", resolve("src/router"))
      .set("store", resolve("src/store"));
  },
  devServer: {
    proxy: {
      "/front": {
        target: "http://127.0.0.1:8081",
        ws: true,
        changeOrigin: true
      }
    },
    overlay: {
      warning: false
    }
  }
};
