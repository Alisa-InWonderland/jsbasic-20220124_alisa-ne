import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
	constructor({ steps,
		value = 0 }) {
		this.value = value;
		this.steps = steps;
		this.elem = this.render();
	}
	
	render() { 

		this.slider = createElement(`
  			<div class="slider">

				<div class="slider__thumb" style="left: 50%;">
					<span class="slider__value">${this.value}</span>
				</div>

				<div class="slider__progress" style="width: 50%;"></div>

				<div class="slider__steps">
					
				</div>
			</div>
		`);

		this.sliderSteps = this.slider.querySelector('.slider__steps');
		

		for (let i = 0; i < this.steps; i++) {
			this.sliderSteps.insertAdjacentHTML('beforeend',
				`<span class="step" data-id="${i}"></span>`);
		}

		console.log(this.steps);
		console.log(this.value);

		this.slider.addEventListener('click', (event) => {
			let left = event.clientX - this.elem.getBoundingClientRect().left;
			let leftRelative = left / this.elem.offsetWidth;
			let segments = this.steps - 1;
			let approximateValue = leftRelative * segments;
			let value = Math.round(approximateValue);
			let valuePercents = value / segments * 100;

			this.stepList = this.slider.querySelectorAll('.step');
			this.sliderValue = this.slider.querySelector('.slider__value');
			//console.log(this.stepList);


			
			/* let span = event.target.closest('.step');

			 for (let step of this.stepList) {
				 step.classList.remove('slider__step-active');
				 span.classList.add('slider__step-active');
				 this.sliderValue.textContent = span.getAttribute('data-id'); 
				
			} 
 */
			
			//step.classList.remove('slider__step-active');
			//if (span) {
				//span.classList.add('slider__step-active');
				//this.sliderValue.textContent = span.getAttribute('data-id');
			//}
			
			const sliderChange = new CustomEvent('slider-change', { 
  				detail: this.value,
  				bubbles: true
			})

			this.slider.dispatchEvent(sliderChange);
		})

		return this.slider;

	}
}
