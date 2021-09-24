document.addEventListener('DOMContentLoaded', function(){

	const accordionGroup = document.querySelectorAll('.accordion');

	accordionGroup.forEach( accordion => {

		const accordionItemGroup = accordion.querySelectorAll('.accordion__item');
		const accordionHeaderGroup = accordion.querySelectorAll('.accordion__header');

		const accordionItemFirst = accordionItemGroup[0];
		accordionItemFirst.classList.add('active');

		accordionItemGroup.forEach( accordionItem => {
			switchAccordionItem(accordionItem);
		});

		accordionHeaderGroup.forEach( accordionHeader => {
			accordionHeader.addEventListener('click', event => {

				accordionItemGroup.forEach( accordionItem => {
					
					accordionItem.contains(event.currentTarget) ? accordionItem.classList.toggle('active') : accordionItem.classList.remove('active');

					switchAccordionItem(accordionItem);
				});

			});
		});

		function switchAccordionItem(accordionItem) {
			const accordionBody = accordionItem.querySelector('.accordion__body');

			if (accordionItem.classList.contains('active')) {
				accordionBody.style.height = accordionBody.scrollHeight + 'px';
			} else {
				accordionBody.style.height = '0px';
			}
		}

	});

});