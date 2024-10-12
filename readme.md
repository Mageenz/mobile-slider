## 用法
### css
```css
<link rel="stylesheet" type="text/css" href="./slide.css">
```

### html
```html
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
</div>
```

### js
```js
<script type="text/javascript" src="./slide.js"></script>
<script type="text/javascript">
	const slide = new mSlide('.slide')
</script>
```

## 配置项

参数名称 | 描述 | 类型 | 默认值
:----------- | :----------- | :----------- | :---------
speed         | 过渡动画的速度        | number | 300
auto         | 是否开启自动滑动        | boolean | true
autoDuration         | 自动滑动的时间间隔        | number | 6000
navigation         | 是否启用分页        | boolean | true
onSlideStart | 滑动开始事件 | 参数为当前的index | |
onSlideEnd | 滑动结束事件 | 参数为当前的index | |

## 优化

- 更丰富配置项
- 触摸角度的问题
- 实现无限滚动
- 实现响应式
- bug
- 精简代码
