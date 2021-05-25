module.exports = {
    ignorePX: true,
    printWidth: 80, // 一行最大多少字符
    tabWidth: 4, // tab占用的字符数
    useTabs: false, // 是否使用tab代替空格
    semi: true, // 是否每句后都加分号
    singleQuote: true, // 是否使用单引号
    jsxSingleQuote: false, // jsx是否使用单引号
    trailingComma: 'all', // 数组尾逗号。
    bracketSpacing: true, // {foo: xx}还是{ foo: xx }
    jsxBracketSameLine: false, //看官网
    arrowParens: 'always', //剪头函数参数是否使用（）
    // https://github.com/prettier/prettier/pull/5701
    proseWrap: 'never',
};
