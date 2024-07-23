// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
// register Swiper custom elements
register()
// Slider main container
document.querySelector('#app').innerHTML = `
  <swiper-container class="swiper-container" init="false"></swiper-container>
`

// Swiper element
const swiperEl = document.querySelector('swiper-container')
// Swiper parameters
const swiperParams = {
  slidesPerView: 2,
  spaceBetween: 20,
  delay: 3000,
  autoplay: true,
  loop: true,
  navigation: true,
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.50": {
      slidesPerView: 2,
      spaceBetween: 60,
    },
  },
  on: {
    init () {
      console.log('initialized')
      //
    }
  }
}

fetch('./products.json')
  .then(res => res.json())
  .then((products) => {
    products.forEach(product => {
      const { link, name, image, original_price, discounted_price } = product;
      const slide = document.createElement('swiper-slide')
      slide.className = 'swiper-slide'
      slide.innerHTML = `
      <div class="product">
        <div class="product-image">
          <img src="${image}" alt="${name}">
        </div>
        <div class="product-description">
          <div class="product-favorite">
              <span class="material-symbols-outlined">favorite</span>
          </div>
          <h3><a href="${link}">${name}</a></h3>
          <div class="product-price-cart">
              <span class="price">
                <span class="total ${discounted_price ? 'with-discount' : ''}">
                ${original_price}&#8364;
                </span>${discounted_price
                  ? `<span class="discount">${discounted_price}&#8364;</span>`
                  : ''}
                </span>
              <button>
                  <span class="icon material-symbols-outlined">shopping_cart</span>Add to cart
              </button>
              
          </div>
          
        </div>
      </div>
    `
      swiperEl.appendChild(slide)
    })
    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams)

    // and now initialize it
    swiperEl.initialize()
  })
  .catch(error => console.error('Error loading products:', error))
