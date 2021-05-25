import { FormatePriceProps } from './PropsType';

const FormatePrice = (num: FormatePriceProps): string => {
    const res: any[] = [],
        arr = num.toString().split('').reverse();
    arr.map((item, index) => {
        res.push(index && index % 3 === 0 ? ',' : '');
        res.push(item);
    });
    return res.reverse().join('');
};

export default FormatePrice;
