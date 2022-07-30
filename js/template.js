document.addEventListener('DOMContentLoaded', function(){

	class Accordion {
		constructor(accordion, config) {
			this._accordionEl = accordion
			this._itemsEl = this._accordionEl.querySelectorAll(config.item)
			this._controlsEl =  this._accordionEl.querySelectorAll(config.control)
			this._containerSelector = config.container
			this._contentSelector = config.content
			this._activeClass = config.activeClass

			this._setModeHandler(config.mode)

			this._setAnimationObserver(config.animation)

			this._setHandler(config.animation)

			this._setControlsClickHandler()
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

		_setAnimationObserver(animation) {
			if (animation) {
				this._animate()
				window.addEventListener('resize', () => this._animate())
			}
		}

		_setHandler(animation) {
			if (animation) {
				this._handler = e => {
					this._modeHandler(e)
					this._animate()
				}
			} else {
				this._handler = this._modeHandler
			}
		}

		_setControlsClickHandler() {
			this._controlsEl.forEach(el => el.addEventListener('click', e => this._handler(e)))
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
		}
	}

	const config = {
		item: '[data-item]',
		control: '[data-control]',
		container: '[data-container]',
		content: '[data-content]',
		activeClass: 'active',
		mode: 'collapsible',
		animation: true
	}

	document.querySelectorAll('[data-accordion]').forEach( accordion => {
		new Accordion(accordion, config)
	})

})
