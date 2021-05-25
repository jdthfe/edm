// import webpack from 'webpack';
import base from './webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { getProjectUrl } from '../helpers';

// 使用 awesome-typescript-loader 插件打包 tsx，文件无法生成类型文件
// https://github.com/s-panferov/awesome-typescript-loader/issues/411
// import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
// import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import webpackMerge from 'webpack-merge';

const config: any = {
    mode: 'development',
    devServer: {
        stats: {
            colors: true, //增加控制台颜色开关stats
            modules: false, // 不增加内置模块信息
            children: false, // 不增加子级信息 If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false, // 允许较少的输出
            chunkModules: false, // 不将内置模块的信息加到包信息
        },
        // port: 80,
        // open: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        disableHostCheck: true,
        // 如果不启用无法使用 BrowserRouter
        // historyApiFallback: true
    },
    entry: {
        index: getProjectUrl('site', 'index.tsx'),
    },
    // resolve: {
    //     plugins: [new TsconfigPathsPlugin({})],
    // },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Elephant UI',
            template: getProjectUrl('site', 'index.html'),
        }),
    ],
};

module.exports = webpackMerge(base, config);
