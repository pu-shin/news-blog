export const clickOutside = {
	beforeMount: (el, binding) => {
		el.clickOutsideEvent = event => {
			if (!(el == event.target || el.contains(event.target) || event.target === document.querySelector('nav'))) {
				binding.value();
			}
		};
		document.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted: el => {
		document.removeEventListener("click", el.clickOutsideEvent);
	},
};

