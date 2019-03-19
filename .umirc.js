import { resolve } from 'path';

// const path = require('path');
// ref: https://umijs.org/config/
// https://blog.csdn.net/SCU_Cindy/article/details/82914547 路由配置

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'yaoyan-antd',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
      // 添加全局css
      links: [
        { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
      ],
    }],
    ['./baidu-map-plugin.js'],
  ],


  alias: {
    components: resolve(__dirname, 'src/components/'),
    node_modules: resolve(__dirname, 'src/node_modules/'),
    utils: resolve(__dirname, 'src/utils'),
    assets: resolve(__dirname, 'src/assets'),
  },


  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8888/',
      // target: 'http://192.168.43.30:8888/',
      // target: 'http://139.199.126.202:8888/',
      changeOrigin: true,
      // pathRewrite: { "^/api" : ""}
    },
  },
};
