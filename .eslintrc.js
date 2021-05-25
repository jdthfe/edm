/**
 * eslint
 * @ref https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
 */
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        // 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        // 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    // plugins: ['react-hooks'],
    parserOptions: {
        ecmaVersion: 2018, // Alows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        // project: './tsconfig.json',
    },
    rules: {
        // 对象赋值，指定顺序
        // 'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // 'react-hooks/rules-of-hooks': 'error',
        // 'react-hooks/exhaustive-deps': 'warn',
    },
};
