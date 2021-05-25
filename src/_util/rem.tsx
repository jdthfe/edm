// 设置 rem 函数
function setRem() {
    // 基准大小
    const baseSize: number = 16;
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = Math.min(document.documentElement.clientWidth, 375) / 375;
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize =
        baseSize * Math.min(scale, 2) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem();
};