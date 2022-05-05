document.addEventListener('DOMContentLoaded', function(){

	class Accordion {
		constructor(accordion, config) {
			this._accordionEl = accordion
			this._itemsEl = this._accordionEl.querySelectorAll(config.item)
			this._control = config.control
			this._container = config.container
			this._content = config.content
			this._activeClass = config.activeClass
			this._mode = config.mode
			this._animation = config.animation

			this._animate = this._animate.bind(this)

			this._accordionEl.addEventListener('click', event => {
				if (event.target.closest(this._control)) {
					switch (this._mode) {
						case 'collapsible':
							this._collapsible(event)
							break
						case 'multiple':
							this._multiple(event)
							break
						default:
							this._default(event)
					}

					if (this._animation) {
						this._animate()
					}
				}
			})
			
			if (this._animation) {
				this._animate()

				window.addEventListener('resize', this._animate)
			}

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
				item.querySelector(this._container).style.height = item.classList.contains(this._activeClass) ? item.querySelector(this._content).scrollHeight + 'px' : ''
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
