const slide = function(dom, options = {}) {
	const defaultOptions = {
		speed: 300, // 过渡的时间
		auto: true, // 是否自动滚动
		autoDuration: 6000, // 自动滚动的时间间隔
		navigation: true // 是否显示分页
	}
	this.options = {...defaultOptions, ...options}
	this.parentDom = document.querySelector(dom)
	this.containerDom = this.parentDom.querySelector('.mg-slide-container')
	this.parentDomWidth = this.parentDom.getBoundingClientRect().width
	this.slideDoms = this.parentDom.querySelectorAll('.mg-slide-item')

	// 页码
	this.navigation = document.createElement('ul')
	this.navigations = []
	
	this.startX = 0
	this.currentSlideDom = this.slideDoms[0]

	// 当前滑块
	this.currentIndex = 0

	// 滑动方法
	const slide = () => {
		this.containerDom.style.transitionDuration = `${this.options.speed}ms`
		setTimeout(() => {
			this.containerDom.style.transitionDuration = '0ms'
		}, 300)
		this.containerDom.style.transform = `translate3d(${-this.currentIndex*this.parentDomWidth}px, 0, 0)`
		this.currentSlideDom.classList.remove('active')
		this.currentSlideDom = this.slideDoms[this.currentIndex]
		this.currentSlideDom.classList.add('active')

		if(this.options.navigation) {
			toggleNavigation()
		}
	}

	const initNavigation = () => {
		this.slideDoms.forEach((item, index) => {
			const navigationItem = this.navigation.appendChild(document.createElement('li'))
			this.navigations.push(navigationItem)
			if(index === 0) {
				navigationItem.classList.add('active')
			}
		})
	}

	const toggleNavigation = () => {
		this.slideDoms.forEach((item, index) => {
			if(item.classList.contains('active')) {
				this.navigations[index].classList.add('active')
			} else {
				this.navigations[index].classList.remove('active')
			}
		})
	}

	const autoScroll = () => {
		setInterval(() => {
			if(this.currentIndex < this.slideDoms.length - 1) {
				this.currentIndex++
			} else {
				this.currentIndex = 0
			}

			slide()
		}, this.options.autoDuration)
	}

	this.navigation.classList.add('mg-navigation')

	this.currentSlideDom.classList.add('active')

	this.containerDom.style.width = `${this.slideDoms.length * this.parentDomWidth}px`

	this.slideDoms.forEach((item, index) => {
		item.style.width = `${this.parentDomWidth}px`
	})

	if(this.options.navigation) {
		initNavigation()
	}

	this.parentDom.appendChild(this.navigation)

	this.containerDom.addEventListener('touchstart', e => {
		const touch = e.changedTouches[0]

		this.startX = touch.clientX

	})

	this.containerDom.addEventListener('touchmove', e => {
		const movedX = e.changedTouches[0].clientX
		const tempTranslateX = (movedX - this.startX)/2

		this.containerDom.style.transform = `translate3d(${-this.currentIndex*this.parentDomWidth + tempTranslateX}px, 0, 0)`
	})

	this.containerDom.addEventListener('touchend', e => {
		const endX = e.changedTouches[0].clientX
		const movedX = endX - this.startX

		if(movedX > 0 && Math.abs(movedX) > this.parentDomWidth*0.3) { // 向右滑动，且滑动距离超过图片宽度30%
			if(this.currentIndex > 0) { // 如果当前滑块存在上一个滑块，则滑动
				this.currentIndex--
			}
		} else if(movedX < 0 && Math.abs(movedX) > this.parentDomWidth*0.3) { // 向左滑动
			if(this.currentIndex < this.slideDoms.length - 1) { // 如果当前滑块存在下一个滑块，则滑动
				this.currentIndex++
			}
		}

		slide()
	})

	// 自动滑动
	if(this.options.auto) {
		autoScroll()
	}
}