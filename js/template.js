document.addEventListener('DOMContentLoaded', function(){

	const accordionGroup = document.querySelectorAll('.accordion');

	accordionGroup.forEach( accordion => {

		const accordionItemGroup = accordion.querySelectorAll('.accordion__item');
		accordionItemGroup[0].classList.add('active');

		accordion.addEventListener('click', event => {
			if (event.target.closest('.accordion__header')) {
				accordionItemGroup.forEach( accordionItem => {	
					accordionItem.contains(event.target) ? accordionItem.classList.toggle('active') : accordionItem.classList.remove('active');
				});
			}
		});

	});

});