document.addEventListener("DOMContentLoaded", function(){

	let accordionsGroup = document.querySelectorAll(".accordion");

	accordionsGroup.forEach( accordion => {

		let accordionItemsGroup = accordion.querySelectorAll(".accordion__item");
		let accordionHeadersGroup = accordion.querySelectorAll(".accordion__header");

		accordionItemsGroup.forEach( accordionItem => {
			switchItemBody(accordionItem);
		});

		accordionHeadersGroup.forEach( accordionHeader => {
			accordionHeader.addEventListener("click", event => {

				accordionItemsGroup.forEach( accordionItem => {
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
			if (accordionItem.classList.contains("active")) {
				accordionItem.lastElementChild.style.height = accordionItem.lastElementChild.scrollHeight + "px";
			} else {
				accordionItem.lastElementChild.style.height = "0px";
			}
		}

	});

});