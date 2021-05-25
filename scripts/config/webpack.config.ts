import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPluginfrom from 'stylelint-webpack-plugin';

import getStyleLoader from './getStyleLoader';
import babelrc from '../babelrc.js';
import { getProjectUrl } from '../helpers';

interface EnvMap {
    build: string;
    dist: string;
    development: string;
    [key: string]: string;
}
const devMode: boolean =
    (process.env.NODE_ENV as keyof EnvMap) === 'development';

const tsconfig = getProjectUrl(
    `tsconfig.${process.env.NODE_ENV === 'dist' ? 'dts.' : ''}json`,
);

const config: webpack.Configuration = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', 'css'],
        alias: {
            '@src': getProjectUrl('src'),
            '@tests': getProjectUrl('scripts', 'tests'),
        },
    },
    // output: {
    //     publicPath: './dist',
    // },
    devtool: devMode
        ? 'cheap-module-eval-source-map'
        : 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/, //正则表达式匹配图片规则
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //限制打包图片的大小：
                            //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                            name: 'images/[name]-[hash:8].[ext]', //images:图片打包的文件夹；
                            //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                            //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                        },
                    },
                ],
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            ...babelrc(),
                        },
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: getProjectUrl('.eslintrc.js'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                include: /(node_modules)/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            },
            {
                test: /\.s?([ac])ss$/,
                exclude: /(node_modules)/,
                use: getStyleLoader(),
            },
        ],
    },

    plugins: [
        new StyleLintPluginfrom({
            configFile: getProjectUrl('.stylelintrc.js'),
            context: getProjectUrl(),
            files: ['src/**/*.scss'],
            failOnError: false,
            emitErrors: true,
            syntax: 'scss',
            quiet: false,
        }),
        // 检查代码中的类型错误
        new ForkTsCheckerWebpackPlugin({
            tsconfig,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            // filename: devMode ? "[name].css" : "[name].[hash].css",
            // chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
        }),
    ],
};
export default config;
