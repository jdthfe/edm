在点击控件或者某个区域后，浮出一个气泡菜单来做更多的操作。 如果设置了遮罩层，建议通过点击遮罩层的任一位置，进行退出。

## Demo

jd-compensation 中切换语言、切换国别码的实例

## API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| anchorEl | 展示 popover 的元素 | `any` | - | `true` |
| dir | dir ：popover 的展示方向；包括 上左、上中、上右、下左、下中、下右 | `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'` | - | `true` |
| onClose | popover 消失的时候回调函数 | `() => void` | - | `false` |
| hasArrow | 是否包含箭头 默认是 false（箭头左右位置用外部样式控制） | `boolean` | - | `false` |
