module.exports = {
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
    plugins: ['stylelint-order'], // stylelint-order是CSS属性排序插件
    rules: {
        'order/order': ['custom-properties', 'declarations'],
        // 'order/properties-alphabetical-order': true,
    },
};
