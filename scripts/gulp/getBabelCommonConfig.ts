const resolve = (moduleName: any) =>{
  return require.resolve(moduleName);
}

 const getBabelCommonConfig: any = () => {
  const plugins = [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        isTSX: true,
      },
    ],
    resolve('babel-plugin-inline-import-data-uri'),
    resolve('@babel/plugin-transform-member-expression-literals'),
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-transform-property-literals'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        useESModules: true,
        version: '^7.10.4',
      },
    ],
    resolve('@babel/plugin-transform-spread'),
    resolve('@babel/plugin-transform-template-literals'),
    resolve('@babel/plugin-proposal-export-default-from'),
    resolve('@babel/plugin-proposal-export-namespace-from'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        legacy: true,
      },
    ],
    resolve('@babel/plugin-proposal-class-properties'),
  ];
  return {
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules: false,
          targets: {
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
            },
        },
      ],
    ],
    plugins,
  };
};

export default getBabelCommonConfig;
