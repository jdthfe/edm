import { ThrottleFun } from './PropsType';
// import { prefix } from '../_util/';
// const prefixCls = `${prefix}-throttle`;

const Throttle: ThrottleFun = (fn: () => any, duration?: number) => {
    let _self = fn,
        timer: any = null,
        first = true;
    return function () {
        let args = arguments,
            _this = this;
        if (first) {
            _self.apply(_this, args);
            return (first = false);
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            _self.apply(_this, args);
        }, duration || 500);
    };
};

export default Throttle;
