const ENV = process.env.NODE_ENV;
if (
    // gulpfile.ts will delete 'false &&' when modules === undefined
    false &&
    ENV !== 'production' &&
    ENV !== 'test' &&
    typeof console !== 'undefined' &&
    console.warn &&
    typeof window !== 'undefined'
) {
    console.warn(
        'You are using a whole package of EUI, ' +
            'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
    );
}
export { default as CheckUA } from './CheckUA';
export { default as GetQuery } from './GetQuery';
export { default as DeepObjectMerge } from './DeepObjectMerge';
export { default as FormatePrice } from './FormatePrice';
export { default as Throttle } from './Throttle';
