document.addEventListener("DOMContentLoaded", function(){

	let accordionGroup = document.querySelectorAll(".js-accordion");

	accordionGroup.forEach( accordion => {

		let accordionItemGroup = accordion.querySelectorAll(".js-accordion-item");
		let accordionHeaderGroup = accordion.querySelectorAll(".js-accordion-header");

		accordionItemGroup.forEach( accordionItem => {
			switchItemBody(accordionItem);
		});

		accordionHeaderGroup.forEach( accordionHeader => {
			accordionHeader.addEventListener("click", event => {

				accordionItemGroup.forEach( accordionItem => {
					if (accordionItem.contains(event.target)) {
						accordionItem.classList.toggle("active");
					} else {
						accordionItem.classList.remove("active");
					}

					switchItemBody(accordionItem);
				});

			});
		});

		function switchItemBody(accordionItem) {
			let accordionBody = accordionItem.querySelector(".js-accordion-body");
			if (accordionItem.classList.contains("active")) {
				accordionBody.style.height = accordionBody.scrollHeight + "px";
			} else {
				accordionBody.style.height = "0px";
			}
		}

	});

});