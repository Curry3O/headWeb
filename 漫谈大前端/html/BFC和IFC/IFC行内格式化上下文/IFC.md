### IFC(Inline Formatting Context) 行内格式化上下文
> IFC布局规则:在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 margin，border和 padding在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框。

- 行级盒子的宽度和高度: 高由font-size决定的，宽等于其子行级盒子的外宽度(margin+border+padding+content width)之和。 inlinebox也有自己的宽高度计算的方法，宽度取决于内部元素的宽度，最大为父元素的宽度，linebox的高度取决于linebox元素，一般由最高的元素决定linebox的高度。
- 行内元素的对齐方式,默认是baseline对齐

###### inline元素的baseline位置：
- inline元素的baseline，为内容盒content-box里面文本框的基线。
- inline-block的外边缘就是margin-box的外边缘
- 如果inline-block内部有内容，则baseline为内容最下方的baseline
- 如果Inline-block内部无内容，则baseline与margin-box的下边缘重合。
- 如果overflow属性不为visible（默认）,则baseline与margin-box的下边缘重合。