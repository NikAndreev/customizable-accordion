document.addEventListener('DOMContentLoaded', function(){

	const accordionGroup = document.querySelectorAll('.accordion');

	accordionGroup.forEach( accordion => {

		const accordionItemGroup = accordion.querySelectorAll('.accordion__item');
		const accordionItemFirst = accordionItemGroup[0];
		accordionItemFirst.classList.add('active');

		accordion.addEventListener('click', event => {
			const target = event.target;

			if (target.closest('.accordion__header')) {
				accordionItemGroup.forEach( accordionItem => {	
					accordionItem.contains(target) ? accordionItem.classList.toggle('active') : accordionItem.classList.remove('active');
				});
			}
		});

	});

});