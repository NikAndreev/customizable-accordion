document.addEventListener('DOMContentLoaded', function(){

	let accordionGroup = document.querySelectorAll('.js-accordion');

	accordionGroup.forEach( function(accordion) {

		let accordionItemGroup = accordion.querySelectorAll('.js-accordion-item');
		let accordionHeaderGroup = accordion.querySelectorAll('.js-accordion-header');

		let accordionItemFirst = accordionItemGroup[0];
		accordionItemFirst.classList.add('active');

		accordionItemGroup.forEach( accordionItem => {
			switchItemBody.apply(accordionItem);
		});

		accordionHeaderGroup.forEach( accordionHeader => {
			accordionHeader.addEventListener('click', event => {

				accordionItemGroup.forEach( accordionItem => {
					
					accordionItem.contains(event.currentTarget) ? accordionItem.classList.toggle('active') : accordionItem.classList.remove('active');

					switchItemBody.apply(accordionItem);
				});

			});
		});

		function switchItemBody() {
			let accordionBody = this.querySelector('.js-accordion-body');
			if (this.classList.contains('active')) {
				accordionBody.style.height = accordionBody.scrollHeight + 'px';
			} else {
				accordionBody.style.height = '0px';
			}
		}

	});

});