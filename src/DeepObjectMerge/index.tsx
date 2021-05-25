function isObject(value: any) {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
// { a: [{ b: 2 }] } { a: [{ c: 2 }]} -> { a: [{b:2}, {c:2}]}
// deepObjectMerge({o: {a: 3}}, {o: {b:4}}) => {o: {a:3, b:4}}
const DeepObjectMerge = (source: any, other: any) => {
    if (!isObject(source) || !isObject(other)) {
        return other === undefined ? source : other;
    }
    // 合并两个对象的 key，另外要区分数组的初始值为 []
    return Object.keys({
        ...source,
        ...other,
    }).reduce(
        (acc: any, key) => {
            // 递归合并 value
            acc[key] = DeepObjectMerge(source[key], other[key]);
            return acc;
        },
        Array.isArray(source) ? [] : {},
    );
};

export default DeepObjectMerge;
