
const overlay = document.getElementById('overlay')
const sidebar = document.querySelector('.sidebar')
const displayImageContainer = document.querySelector('.display-image-container')

/* 
 * Opens the closes the sidebar 
 */

const sidebarButton = document.querySelector('.sidebar-open')

sidebarButton.addEventListener('click', () => {
    sidebar.style.display = 'block'
    overlay.style.display = 'block'
})

const sidebarClose = document.getElementById('close-sidebar')

sidebarClose.addEventListener('click', () => {
    sidebar.style.display = 'none'
    overlay.style.display = 'none'
})

// Close opened elements
overlay.addEventListener('click', () => {
    sidebar.style.display = 'none'
    overlay.style.display = 'none'
    displayImageContainer.style.display = 'none'

    // Deletes all active slide
    const activeSlides = document.querySelector('.slider').querySelectorAll('[data-active]')
    activeSlides.forEach(activeSlide => {
        delete activeSlide.dataset.active
    })
})


/* 
 * Cycles through the images
 */

const mainDisplay = document.querySelector('.main-display').querySelectorAll('li')
mainDisplay.forEach(display => {
    display.addEventListener('click', () => {
        let productValue = display.dataset.product
        let selector = `[data-product="${productValue}"]`
        const newActiveSlide = document.querySelector('.slider').querySelector(selector)

        //Set active
        newActiveSlide.dataset.active = 'true'

        displayImageContainer.style.display = 'block'
        overlay.style.display = 'block'
    })
})


// When thumbnails are interacted
const productThumbnails = document.getElementById('productThumbnails')
const proThumbLists = productThumbnails.querySelectorAll('li')
proThumbLists.forEach(proThumb => {
    proThumb.addEventListener('click', () => {
        const activeThumb = productThumbnails.querySelector('.product-thumbnails-active')
        if (!proThumb.classList.contains('product-thumbnails-active')) {
            proThumb.classList.add('product-thumbnails-active')
            activeThumb.classList.remove('product-thumbnails-active')

            //Change main display
            let productValue = proThumb.dataset.product
            let selector = `[data-product="${productValue}"]`
            const activeDisplay = document.querySelector('.main-display').querySelector('[data-active]')
            const newActiveDisplay = document.querySelector('.main-display').querySelector(selector)

            newActiveDisplay.dataset.active = 'true'
            delete activeDisplay.dataset.active
        }
    })
})

// For when thumbnails are interated while images being displayed in the center
// of the screen
const productThumbnailsDisplay = document.querySelector('.product-thumbnails-display')
const productThumbnailsDisplayList = productThumbnailsDisplay.querySelectorAll('li')
productThumbnailsDisplayList.forEach(proThumbDis => {
    proThumbDis.addEventListener('click', () => {
        /* const activeDisplays = document.querySelector('.slider').querySelectorAll('[data-active]')
        activeDisplays.forEach(activeDisplay => {
            delete activeDisplay.dataset.active
        }) */
        const activeThumbDisplay = productThumbnailsDisplay.querySelector('.product-thumbnails-active')
        if (!proThumbDis.classList.contains('product-thumbnails-active')) {
            proThumbDis.classList.add('product-thumbnails-active')
            activeThumbDisplay.classList.remove('product-thumbnails-active')

            // Change displayed image
            let productValue = proThumbDis.dataset.product
            let selector = `[data-product="${productValue}"]`
            //const activeDisplay = document.querySelector('.slider').querySelector('[data-active]')
            const newActiveDisplay = document.querySelector('.slider').querySelector(selector)

            const activeDisplays = document.querySelector('.slider').querySelectorAll('[data-active]')
            activeDisplays.forEach(activeDisplay => {
                delete activeDisplay.dataset.active
            })
            newActiveDisplay.dataset.active = 'true'
            /* delete activeDisplay.dataset.active */
        }

    })
})

// For when the image is cycled while being displayed in the center of the screen
const buttons = document.querySelectorAll('[data-carousel-button]')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1
        const slides = button.closest('[data-carousel]').querySelector('[data-slides]')

        const activeSlide = slides.querySelector('[data-active]')
        let index = [...slides.children].indexOf(activeSlide) + offset
        if (index < 0) index = slides.children.length - 1
        if (index >= slides.children.length) index = 0

        slides.children[index].dataset.active = 'true'
        delete activeSlide.dataset.active
    })
})

// For when the image is cycled in product/main display
