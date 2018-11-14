const mSlide = function(dom, options = {}) {
	const defaultOptions = {
		speed: 300, // 过渡的时间
		auto: true, // 是否自动滚动
		autoDuration: 6000, // 自动滚动的时间间隔
		navigation: true, // 是否显示分页
		onSlideStart(v) {
			console.log('onSlideStart', v)
		},
		onSlideEnd(v) {
			console.log('onSlideEnd', v)
		}
	}
	this.options = {...defaultOptions, ...options}

	// 初始化幻灯片
	const initSlider = () => {
		// 容器
		this.wrap = document.querySelector(dom)

		// 容器宽度
		this.wrapWidth = this.wrap.getBoundingClientRect().width

		// 内容
		this.container = this.wrap.querySelector('.mg-slide-container')

		// 幻灯片
		this.sliders = this.wrap.querySelectorAll('.mg-slide-item')
		
		// 设置幻灯片宽度
		this.sliders.forEach((item, index) => {
			item.style.width = `${this.wrapWidth}px`
		})

		// touchstart x坐标
		this.startX = 0

		// 激活的dom
		this.currentSlider = this.sliders[0]
		this.currentSlider.classList.add('active')

		// 激活dom的索引
		this.currentIndex = 0

		// 设置内容宽度
		this.container.style.width = `${this.sliders.length * this.wrapWidth}px`

		if(this.options.navigation) {
			initNavigation()
		}
		// 自动滑动
		if(this.options.auto) {
			autoSlide()
		}

		initTouchEvent()
	}

	// 初始化touch事件
	initTouchEvent = () => {
		this.container.addEventListener('touchstart', e => {
			const touch = e.changedTouches[0]
	
			this.startX = touch.clientX
	
		})
	
		this.container.addEventListener('touchmove', e => {
			const movedX = e.changedTouches[0].clientX
			const tempTranslateX = (movedX - this.startX)/2
	
			this.container.style.transform = `translate3d(${-this.currentIndex*this.wrapWidth + tempTranslateX}px, 0, 0)`
		})
	
		this.container.addEventListener('touchend', e => {
			const endX = e.changedTouches[0].clientX
			const movedX = endX - this.startX
	
			if(movedX > 0 && Math.abs(movedX) > this.wrapWidth*0.3) { // 向右滑动，且滑动距离超过图片宽度30%
				if(this.currentIndex > 0) { // 如果当前滑块存在上一个滑块，则滑动
					this.currentIndex--
				}
			} else if(movedX < 0 && Math.abs(movedX) > this.wrapWidth*0.3) { // 向左滑动
				if(this.currentIndex < this.sliders.length - 1) { // 如果当前滑块存在下一个滑块，则滑动
					this.currentIndex++
				}
			}
	
			slide()
		})
	}

	// 滑动方法
	const slide = () => {
		// 滑动时设置transition，在结束后去掉transition，为了动画效果
		this.options.onSlideStart(this.currentIndex)
		this.container.style.transitionDuration = `${this.options.speed}ms`

		setTimeout(() => {
			this.options.onSlideEnd(this.currentIndex)
			this.container.style.transitionDuration = '0ms'
		}, this.options.speed)
		
		// 滑动的位置，距离为向右移动的距离，所以是translate3d(${-this.currentIndex*this.wrapWidth}px, 0, 0)
		this.container.style.transform = `translate3d(${-this.currentIndex*this.wrapWidth}px, 0, 0)`

		// 切换active类
		this.currentSlider.classList.remove('active')
		this.currentSlider = this.sliders[this.currentIndex]
		this.currentSlider.classList.add('active')

		// 如果开启了页码，切换页码状态
		if(this.options.navigation) {
			toggleNavigation()
		}
	}

	// 初始化页码
	const initNavigation = () => {
		this.navigation = document.createElement('ul')
		this.navigation.classList.add('mg-navigation')
		this.navigations = []
		this.wrap.appendChild(this.navigation)

		this.sliders.forEach((item, index) => {
			const navigationItem = this.navigation.appendChild(document.createElement('li'))

			this.navigations.push(navigationItem)
			if(index === 0) {
				navigationItem.classList.add('active')
			}
		})
	}

	// 切换页码
	const toggleNavigation = () => {
		this.sliders.forEach((item, index) => {
			if(item.classList.contains('active')) {
				this.navigations[index].classList.add('active')
			} else {
				this.navigations[index].classList.remove('active')
			}
		})
	}

	// 自动滑动
	const autoSlide = () => {
		setInterval(() => {
			if(this.currentIndex < this.sliders.length - 1) {
				this.currentIndex++
			} else {
				this.currentIndex = 0
			}

			slide()
		}, this.options.autoDuration)
	}

	initSlider()
}