## 简介

移动端滑动插件，无依赖。

## 用法与结构

### html

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

### css

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


## 优化方向

- 更丰富配置项
- 滑动角度的问题
- 无限滚动的设计