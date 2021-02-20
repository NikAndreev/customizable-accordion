document.addEventListener("DOMContentLoaded", function(){

	let accordions = document.querySelectorAll(".accordion");

	accordions.forEach( function(accordion){

		let accordionItems = accordion.querySelectorAll(".accordion__item");
		let accordionHeaders = accordion.querySelectorAll(".accordion__header");

		accordionItems.forEach( function(accordionItem){
			switchAccordionBody(accordionItem);
		});

		accordionHeaders.forEach( function(accordionHeader){
			accordionHeader.addEventListener("click", function(event){

				accordionItems.forEach( function(accordionItem){
					if (accordionItem.contains(event.target)) {
						accordionItem.classList.toggle("active");
					} else {
						accordionItem.classList.remove("active");
					}

					switchAccordionBody(accordionItem);
				});

			});
		});

		function switchAccordionBody(accordionItem) {
			if (accordionItem.classList.contains("active")) {
				accordionItem.lastElementChild.style.height = accordionItem.lastElementChild.scrollHeight + "px";
			} else {
				accordionItem.lastElementChild.style.height = "0px";
			}
		}

	});

});
