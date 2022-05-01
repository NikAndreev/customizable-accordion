document.addEventListener('DOMContentLoaded', function(){

	class Accordion {
		#accordionEl
		#itemsEl
		#control
		#container
		#content
		#activeClass
		#mode
		#animation

		constructor(accordion, config) {
			this.#accordionEl = accordion
			this.#itemsEl = this.#accordionEl.querySelectorAll(config.item)
			this.#control = config.control
			this.#container = config.container
			this.#content = config.content
			this.#activeClass = config.activeClass
			this.#mode = config.mode
			this.#animation = config.animation

			this.#accordionEl.addEventListener('click', event => {
				if (event.target.closest(this.#control)) {
					switch (this.#mode) {
						case 'collapsible':
							this.#collapsible(event)
							break
						case 'multiple':
							this.#multiple(event)
							break
						default:
							this.#default(event)
					}

					if (this.#animation) {
						this.#animate()
					}
				}
			})
			
			if (this.#animation) {
				this.#animate()

				window.addEventListener('resize', () => {
					this.#animate()
				})
			}

		}

		#collapsible(event) {
			this.#itemsEl.forEach(item => {
				item.contains(event.target) ? item.classList.toggle(this.#activeClass) : item.classList.remove(this.#activeClass)
			})
		}

		#multiple(event) {
			this.#itemsEl.forEach(item => {
				item.contains(event.target) ? item.classList.toggle(this.#activeClass) : ''
			})
		}

		#default(event) {
			this.#itemsEl.forEach(item => {
				item.contains(event.target) ? item.classList.add(this.#activeClass) : item.classList.remove(this.#activeClass)
			})
		}

		#animate() {
			this.#itemsEl.forEach(item => {
				item.querySelector(this.#container).style.height = item.classList.contains(this.#activeClass) ? item.querySelector(this.#content).scrollHeight + 'px' : ''
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
