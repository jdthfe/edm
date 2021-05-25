import React from 'react';
import { DeepObjectMerge } from '@src/index';
const Demo = () => {
    const a = DeepObjectMerge({ o: { a: 3 } }, { o: { b: 4 } });
    return <div className="DeepObjectMerge">{JSON.stringify(a)}</div>;
};

export default Demo;
