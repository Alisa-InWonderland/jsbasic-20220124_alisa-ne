
import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
	  this.categories = categories;
	  this.elem = this.render();
	}
	
	render() {
		this.ribbon = createElement(`

  			<div class="ribbon">

				<button class="ribbon__arrow ribbon__arrow_left">
					<img src="/assets/images/icons/angle-icon.svg" alt="icon">
				</button>

				<nav class="ribbon__inner">
				</nav>

				<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
					<img src="/assets/images/icons/angle-icon.svg" alt="icon">
				</button>

  			</div>
		`);


		this.ribbonInner = this.ribbon.querySelector('.ribbon__inner');

		for (let category of this.categories) {
			this.ribbonInner.insertAdjacentHTML('beforeend',
				`<a href="#" class="ribbon__item" data-id="${category.id}" >${category.name}</a>`);
		}


		this.btnLeft = this.ribbon.querySelector('.ribbon__arrow_left');
		this.btnRight = this.ribbon.querySelector('.ribbon__arrow_right');
		this.ribbonItems = this.ribbon.querySelectorAll('.ribbon__item');
		this.ribbonItem = this.ribbon.querySelector('.ribbon__item');
		this.ribbonItem.classList.add('ribbon__item_active');
	

		this.btnRight.addEventListener('click', () => { this.ribbonInner.scrollBy(350, 0); });
		this.btnLeft.addEventListener('click', () => { this.ribbonInner.scrollBy(-350, 0); });
		
		
		this.ribbonInner.addEventListener('scroll', () => { 
			this.scrollWidth = this.ribbonInner.scrollWidth;
			this.clientWidth = this.ribbonInner.clientWidth;
			this.scrollLeft = this.ribbonInner.scrollLeft;
			this.scrollRight = this.scrollWidth - this.scrollLeft - this.clientWidth;

			this.scrollLeft > 0 ?
				this.btnLeft.classList.add('ribbon__arrow_visible')
				: this.btnLeft.classList.remove('ribbon__arrow_visible');

			this.scrollRight < 1 ?
				this.btnRight.classList.remove('ribbon__arrow_visible')
				: this.btnRight.classList.add('ribbon__arrow_visible');	
		});
		

		for (let item of this.ribbonItems) {
			item.addEventListener('click', (event) => {
				event.preventDefault();

				const ribbonSelectEvent = new CustomEvent('ribbon-select', {
					detail: event.target.getAttribute('data-id'),
					bubbles: true
				});
				
				this.ribbon.dispatchEvent(ribbonSelectEvent);
				
				for (let item of this.ribbonItems) {
					item.classList.remove('ribbon__item_active');
					event.target.classList.add('ribbon__item_active');
				}
				
			});
		}		
				
		return this.ribbon;
	}
	
}