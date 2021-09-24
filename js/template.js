document.addEventListener('DOMContentLoaded', function(){

	const accordionGroup = document.querySelectorAll('.accordion');

	accordionGroup.forEach( accordion => {

		const accordionItemGroup = accordion.querySelectorAll('.accordion__item');
		const accordionHeaderGroup = accordion.querySelectorAll('.accordion__header');

		const accordionItemFirst = accordionItemGroup[0];
		accordionItemFirst.classList.add('active');

		accordionHeaderGroup.forEach( accordionHeader => {
			accordionHeader.addEventListener('click', event => {

				accordionItemGroup.forEach( accordionItem => {	
					accordionItem.contains(event.currentTarget) ? accordionItem.classList.toggle('active') : accordionItem.classList.remove('active');
				});

			});
		});

	});

});