// eslint-disable-next-line @typescript-eslint/no-triple-slash-reference
/// <reference path="../postcss-pxtorem.d.ts" />
import { series, src} from 'gulp';
// import { series, src, dest } from 'gulp';
// import { spawn } from 'child_process';
const gulp = require('gulp');
const ts = require('gulp-typescript');
const through2 = require('through2');
import tsConfig from './tsconfig';
const stripCode = require('gulp-strip-code');


// import replace from 'gulp-replace';
// import rename from 'gulp-rename';
// import scss from 'gulp-sass';
// import process from 'process';
import rimraf from 'rimraf';
// const babel = require('gulp-babel');
import babel from 'gulp-babel';
// import debug from 'gulp-debug';
// import postcss from 'gulp-postcss';
// import babelrc from '../babelrc.js';
import { getProjectUrl } from '../helpers';
import getBabelCommonConfig from './getBabelCommonConfig';
const replaceLib = require('./replaceLib');
// import postcssOptions from '../postcssOptions';

const libDir = getProjectUrl('compiled', 'lib');
const esDir = getProjectUrl('compiled', 'es');

function clean(dir: string) {
    rimraf.sync(dir);
}

function swallowError(error: any) {
    // If you want details of the error in the console
    console.error(error.toString());
    // todo 完善删除
    clean(esDir);
    clean(libDir);
    throw error;
}

// const source = [
//     getProjectUrl('src/*/*.tsx'),
//     getProjectUrl('src/*/style/*.tsx'),
//     // getProjectUrl('src/*.tsx'),
//     // getProjectUrl('typings/**/*.ts'),
// ];
// function convertTstoJs(output: string, modules?: boolean) {
//     const title = modules !== false ? 'lib: [tsx ] -> [ js ]' : 'es : [tsx ] -> [ js ]';
//     return new Promise((res, rej) => {
//         src([getProjectUrl('src/index.tsx')])
//             .pipe(replace(/false &&/g, modules !== false ? '' : 'false &&'))
//             .pipe(src(source))
//             .pipe(debug({ title }))
//             .pipe(babel(babelrc(modules)))
//             .on('error', rej)
//             .pipe(dest(output))
//             .on('end', res);
//     });
// }

// const tsConfig = {
//     "noUnusedParameters": true,
//     "noUnusedLocals": true,
//     "strictNullChecks": true,
//     "target": "es6",
//     "jsx": "preserve",
//     "moduleResolution": "node",
//     "declaration": true,
//     "allowSyntheticDefaultImports": true,
//     "allowJs": false,
//     "lib": ["es6", "dom"],
//     "keyofStringsOnly": true,
//     "noImplicitAny": true,
//     "esModuleInterop": true,
//     "declarationDir": "....//compiled/es",
//     "skipLibCheck": true,
//     // "include": ["src"],
//     // "exclude": ["node_modules", "lib", "es"]
//     // "exclude": ["node_modules","**/demo", "**/__tests__", "node_modules/*/**", "src/scss.tsx", "node_modules"]

// }
// const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];


// const tsResult = sourceStream.pipe(
//   ts(tsConfig, {
//     error(e) {
//       tsDefaultReporter.error(e);
//       error = 1;
//     },
//     finish: tsDefaultReporter.finish,
//   })
// );

// function check() {
//   if (error && !argv['ignore-error']) {
//     process.exit(1);
//   }
// }

// tsResult.on('finish', check);
// tsResult.on('end', check);
// const tsFilesStream = babelify(tsResult.js, modules);
// const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
// return merge2([less, tsFilesStream, tsd, assets]);
function compileTs() {
  const babelConfig: any = getBabelCommonConfig();
  babelConfig.plugins.push(replaceLib);
  const tsResult = src( [getProjectUrl('src/*/*.tsx'), getProjectUrl('src/*/style/*.tsx')]).pipe(
    stripCode({
      start_comment: '@remove-on-es-build-begin',
      end_comment: '@remove-on-es-build-end',
    })
  ).pipe(ts(tsConfig()))


        tsResult.js.pipe(babel(babelConfig)).pipe(
          through2.obj(function z(file:any, encoding:any, next:any) {
            console.log(encoding);
            
            this.push(file.clone());
            if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
              const content = file.contents.toString(encoding);
              if (content.indexOf("'react-native'") !== -1) {
                // actually in antd-mobile@2.0, this case will never run,
                // since we both split style/index.mative.js style/index.js
                // but let us keep this check at here
                // in case some of our developer made a file name mistake ==
                next();
                return;
              }
      
              file.path = file.path.replace(/index\.js/, 'css.js');
              this.push(file);
              next();
            } else {
              next();
            }
          })
        ).pipe(gulp.dest(esDir));

        tsResult.dts.pipe(gulp.dest(esDir));


  // tsResult.js.pipe(gulp.dest(esDir));
      // src([getProjectUrl('src/**/*.tsx')])
      // .pipe(ts(tsConfig()))
      // .js.pipe(
      //   through2.obj(function (file: any, encoding: any, next:any) {
      //     // console.log(file.path, file.base);
      //     console.log(encoding);
          
      //     file.path = file.path.replace(/\.[jt]sx$/, '.js');
      //     console.log(file);
          
      //   //   this.push(file);
      //     next();
      //   })
      // )
      // .pipe(gulp.dest('release/js'));
  }
function compileDTs() {
    const babelConfig: any = getBabelCommonConfig();
 
    src( [getProjectUrl('src/*/*.tsx'), getProjectUrl('src/*/style/*.tsx')])
          .pipe(babel(babelConfig)).pipe(
            through2.obj(function z(file:any, encoding:any, next:any) {
              console.log(encoding);
              
              this.push(file.clone());
              if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                const content = file.contents.toString(encoding);
                if (content.indexOf("'react-native'") !== -1) {
                  // actually in antd-mobile@2.0, this case will never run,
                  // since we both split style/index.mative.js style/index.js
                  // but let us keep this check at here
                  // in case some of our developer made a file name mistake ==
                  next();
                  return;
                }
        
                file.path = file.path.replace(/index\.js/, 'css.js');
                this.push(file);
                next();
              } else {
                next();
              }
            })
          ).pipe(gulp.dest(libDir));
  
  
    // tsResult.js.pipe(gulp.dest(esDir));
        // src([getProjectUrl('src/**/*.tsx')])
        // .pipe(ts(tsConfig()))
        // .js.pipe(
        //   through2.obj(function (file: any, encoding: any, next:any) {
        //     // console.log(file.path, file.base);
        //     console.log(encoding);
            
        //     file.path = file.path.replace(/\.[jt]sx$/, '.js');
        //     console.log(file);
            
        //   //   this.push(file);
        //     next();
        //   })
        // )
        // .pipe(gulp.dest('release/js'));
    }
// function convertTstoDts() {
//     console.log();
//     console.log('Convert Ts to Dts By Typescript...');
//     console.log();
//     const tsc = spawn('tsc', ['-pretty', '--emitDeclarationOnly', '-p', '../../tsconfig.dts.json'], {
//         stdio: 'inherit',
//         shell: process.platform === 'win32',
//     });
//     return new Promise((res, rej) => {
//         tsc.on('exit', code => {
//             if (!code) {
//                 res();
//             } else {
//                 console.log(code);
//                 rej(code);
//             }
//         });
//     });
// }

// function copyDts() {
//     console.log();
//     console.log('Convert Ts to Dts By Typescript...');
//     console.log();
//     const dtsFile = [getProjectUrl('compiled/es/**/*.d.ts')];
//     return new Promise((res, rej) => {
//         src(dtsFile)
//             .on('error', rej)
//             .pipe(dest(libDir))
//             .on('end', res);
//     });
// }

// const scssSource = [getProjectUrl('src/**/style/*.scss')];
// function copyScss(modules?: boolean) {
//     const title = modules !== false ? 'lib: [scss] -> [scss]' : 'es : [scss] -> [scss]';
//     return new Promise((res, rej) => {
//         src(scssSource)
//             .pipe(debug({ title }))
//             .on('error', rej)
//             .pipe(dest(modules !== false ? libDir : esDir))
//             .on('end', res);
//     });
// }

// function convertScssToCss(modules?: boolean) {
//     const title = modules !== false ? 'lib: [scss] -> [ css]' : 'es : [scss] -> [ css]';
//     return new Promise((res, rej) => {
//         src(scssSource)
//             .pipe(debug({ title }))
//             .pipe(scss())
//             .pipe(postcss(postcssOptions))
//             .on('error', rej)
//             .pipe(dest(modules !== false ? libDir : esDir))
//             .on('end', res);
//     });
// }

// const styleIndexSource = [getProjectUrl('src/**/style/index.tsx')];
// function buildCssJs(modules?: boolean) {
//     const title = modules !== false ? 'lib: [tsx ] -> [ js ]' : 'es : [tsx ] -> [ js ]';
//     return new Promise((res, rej) => {
//         src(styleIndexSource)
//             .pipe(debug({ title }))
//             .pipe(replace(/\/style\/?'/g, "/style/css'"))
//             .pipe(replace(/\.scss/g, '.css'))
//             .pipe(babel(babelrc(modules)))
//             .pipe(
//                 rename({
//                     basename: 'css',
//                     extname: '.js',
//                 }),
//             )
//             .on('error', rej)
//             .pipe(dest(modules !== false ? libDir : esDir))
//             .on('end', res);
//     });
// }

function compile(modules?: boolean) {
    clean(modules !== false ? libDir : esDir);
    // const dir = modules !== false ? libDir : esDir;
    return Promise.all([
        // copyScss(modules),
        // convertScssToCss(modules),
        // buildCssJs(modules),
        // convertTstoJs(dir, modules),
        compileTs(),
        compileDTs()
        // modules !== false ? null : convertTstoDts(),
        // modules !== false ? copyDts() : convertTstoDts(),
    ]).catch(err => {
        console.log(err);
        swallowError(err);
    });
}

function compileWithEs() {
    return compile(false);
}
// function compileWithCommon() {
//     return compile();
// }

exports.compile = series(compileWithEs);
