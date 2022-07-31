document.addEventListener('DOMContentLoaded', function(){

	class Accordion {
		constructor(accordion, config) {
			this._accordionEl = accordion
			this._itemsEl = this._accordionEl.querySelectorAll(config.item)
			this._controlsEl =  this._accordionEl.querySelectorAll(config.control)
			this._containerSelector = config.container
			this._contentSelector = config.content
			this._activeClass = config.activeClass
			this._animation = config.animation

			if (typeof config.on === 'object') {
				this._setCallbacks(config.on)
			}
			
			this._setModeHandler(config.mode)

			if (this._animation) {
				this._animate = this._animate.bind(this)
				this._setAnimationObserver()
			}

			this._handler = this._handler.bind(this)
			this._setControlsClickHandler()

			if (this._onInit) {
				this._onInit()
			}
		}

		destroy() {
			this._removeControlsClickHandler()
			this._removeAnimationObserver()
			
			this._accordionEl = null
			this._itemsEl = null
			this._controlsEl = null
			this._containerSelector = null
			this._contentSelector = null
			this._activeClass = null
			this._animation = null

			if (this._onDestroy) {
				this._onDestroy()
			}

			this._removeCallbacks()
		}

		_setCallbacks(config) {
			if (typeof config.init === 'function') {
				this._onInit = config.init
			}

			if (typeof config.toggle === 'function') {
				this._onToggle = config.toggle
			}

			if (typeof config.animate === 'function') {
				this._onAnimate = config.animate
			}

			if (typeof config.destroy === 'function') {
				this._onDestroy = config.destroy
			}
		}

		_removeCallbacks() {
			if (this._onInit) {
				this._onInit = null
			}
			
			if (this._onToggle) {
				this._onToggle = null
			}

			if (this._onAnimate) {
				this._onAnimate = null
			}

			if (this._onDestroy) {
				this._onDestroy = null
			}
		}

		_setModeHandler(mode) {
			switch (mode) {
				case 'collapsible':
					this._modeHandler = this._collapsible
					break
				case 'multiple':
					this._modeHandler = this._multiple
					break
				default:
					this._modeHandler = this._default
			}
		}

		_removeAnimationObserver() {
			window.removeEventListener('resize', this._animate)
		}

		_setAnimationObserver() {
			this._animate()
			window.addEventListener('resize', this._animate)
		}

		_handler(e) {
			this._modeHandler(e)

			if (this._onToggle) {
				this._onToggle()
			}

			if (this._animation) {
				this._animate()
			}
		}

		_setControlsClickHandler() {
			this._controlsEl.forEach(el => el.addEventListener('click', this._handler))
		}

		_removeControlsClickHandler() {
			this._controlsEl.forEach(el => el.removeEventListener('click', this._handler))
		}

		_collapsible(event) {
			this._itemsEl.forEach(item => {
				item.contains(event.target) ? item.classList.toggle(this._activeClass) : item.classList.remove(this._activeClass)
			})
		}

		_multiple(event) {
			this._itemsEl.forEach(item => {
				item.contains(event.target) ? item.classList.toggle(this._activeClass) : ''
			})
		}

		_default(event) {
			this._itemsEl.forEach(item => {
				item.contains(event.target) ? item.classList.add(this._activeClass) : item.classList.remove(this._activeClass)
			})
		}

		_animate() {
			this._itemsEl.forEach(item => {
				item.querySelector(this._containerSelector).style.height = item.classList.contains(this._activeClass) ? item.querySelector(this._contentSelector).scrollHeight + 'px' : ''
			})

			if (this._onAnimate) {
				this._onAnimate()
			}
		}
	}

	const config = {
		item: '[data-item]',
		control: '[data-control]',
		container: '[data-container]',
		content: '[data-content]',
		activeClass: 'active',
		mode: 'collapsible',
		animation: true,
		on: {
			init: function () {
				console.log('Accordion initialized');
			},
			toggle: function () {
				console.log('Accordion toggled');
			},
			animate: function () {
				console.log('Animation played');
			},
			destroy: function () {
				console.log('Accordion destroyed');
			}
		},
	}

	document.querySelectorAll('[data-accordion]').forEach( accordion => {
		new Accordion(accordion, config)
	})

})
