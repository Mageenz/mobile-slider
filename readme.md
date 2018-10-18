## 简介

移动端滑动插件，无依赖。

## 用法

首先引用css
```
<link rel="stylesheet" type="text/css" href="./slide.css">
```

然后引用js
```
<script type="text/javascript" src="./slide.js"></script>
<script type="text/javascript">
	const slide = new slide('.slide')
</script>
```

## html

```html
<div class="mg-slide s1">
	<div class="mg-slide-container">
		<div class="mg-slide-item">
			<div class="img" style="background-image: url(./1.jpg);"></div>
		</div>
		<div class="mg-slide-item">
			<div class="img" style="background-image: url(./2.png);"></div>
		</div>
		<div class="mg-slide-item">
			<div class="img" style="background-image: url(./3.jpg);"></div>
		</div>
		<div class="mg-slide-item">
			<div class="img" style="background-image: url(./1.jpg);"></div>
		</div>
		<div class="mg-slide-item">
			<div class="img" style="background-image: url(./2.png);"></div>
		</div>
	</div>
</div>
```

## css

较多，核心部分，思路是mg-slide为固定的容器，超出部分隐藏。mg-slide-container是内容，主要就是控制它的位置(translate3d)。
[will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)。

```css
.mg-slide {
	width: 100%;
	overflow: hidden;
	position: relative;
}
.mg-slide-container {
	transition-property: transform;
	overflow: hidden;
	will-change: transform;
}
```

### js

通过[touch](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)事件控制mg-slide-container位置，目前有默认的4个配置项，具体看代码吧。

### 配置

参数名称 | 描述 | 类型 | 默认值
:----------- | :----------- | :----------- | :---------
speed         | 过渡动画的速度        | number | 300
auto         | 是否开启自动滑动        | boolean | true
autoDuration         | 自动滑动的时间间隔        | number | 6000
navigation         | 是否启用分页        | boolean | true

## 优化

- 更丰富配置项
- 滑动角度的问题
- 无限滚动的设计
- 更少的bug