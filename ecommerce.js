
const overlay = document.getElementById('overlay')
const sidebar = document.querySelector('.sidebar')
const displayImageContainer = document.querySelector('.display-image-container')
const cart = document.querySelector('.cart-container')

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
        const activeThisThumbnail = document.querySelector('.product-thumbnails-display').querySelector(selector)
        activeThumbnailDisplay(activeThisThumbnail)


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


// Function that changes the active element in thumbnail display
const activeThumbnailDisplay = (element) => {
    if (!element.classList.contains('product-thumbnails-active')) {
        const activeThumbDisplay = productThumbnailsDisplay.querySelector('.product-thumbnails-active')
        if(activeThumbDisplay) activeThumbDisplay.classList.remove('product-thumbnails-active')
        element.classList.add('product-thumbnails-active')

        // Change displayed image
        let productValue = element.dataset.product
        let selector = `[data-product="${productValue}"]`
        //const activeDisplay = document.querySelector('.slider').querySelector('[data-active]')
        const newActiveDisplay = document.querySelector('.slider').querySelector(selector)

        const activeDisplays = document.querySelector('.slider').querySelectorAll('[data-active]')
        activeDisplays.forEach(activeDisplay => {
            delete activeDisplay.dataset.active
        })
        newActiveDisplay.dataset.active = 'true'
    }
}


// For when thumbnails are interated while images being displayed in the center
// of the screen
const productThumbnailsDisplay = document.querySelector('.product-thumbnails-display')
const productThumbnailsDisplayList = productThumbnailsDisplay.querySelectorAll('li')
productThumbnailsDisplayList.forEach(proThumbDis => {
    proThumbDis.addEventListener('click', () => {
        activeThumbnailDisplay(proThumbDis)
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

        let thisThumbnail = `[data-product="${slides.children[index].dataset.product}"]`
        const activeThisThumbnail = document.querySelector('.product-thumbnails-display').querySelector(thisThumbnail)
        activeThumbnailDisplay(activeThisThumbnail)
    })
})



// Function that checks if cart is empty
const isItEmpty = document.querySelector('.is-it-empty-container')
const isCartEmpty = () => {
    if (cartList.children.length >= 1) {
        isItEmpty.style.display = 'none'
        checkout.style.display = 'block'
    }
    else if (cartList.children.length == 0) {
        checkout.style.display = 'none'
        isItEmpty.style.display = 'grid'
    }
}



// Quantity
const quantityButtons = document.querySelectorAll('[data-value]')
const quantityLabel = document.querySelector('[data-quantity]')
quantityButtons.forEach(quantityButton => {
    quantityButton.addEventListener('click', e => {
        // Adds the value of the button to the label // -1 or +1
        if (parseInt(quantityButton.dataset.value) > 0 || (parseInt(quantityButton.dataset.value) < 0 && parseInt(quantityLabel.dataset.quantity) > 0)) {
            let newValue = parseInt(quantityLabel.dataset.quantity) + parseInt(quantityButton.dataset.value)
            quantityLabel.dataset.quantity = newValue.toString()
            quantityLabel.textContent = newValue.toString()
        }
    })
})


// Cart button
const openCart = document.querySelector('.cart-button')
openCart.addEventListener('click', () => {
    if (window.getComputedStyle(cart).display === 'block') {
        cart.style.display = 'none'
    }
    else {
        cart.style.display = 'block'
    }
})


//Add to cart
const cartList = document.querySelector('.cart-list')
const addToCart = document.querySelector('.add-to-cart')
addToCart.addEventListener('click', () => {
    // Checks if quantity is more than 0
    const quantity = document.querySelector('[data-quantity]')
    if (quantity.dataset.quantity == 0) {
        return
    }

    // Create new list
    const newList = document.createElement('li')

    // Thumbnail
    const thumbnailDiv = document.createElement('div')
    thumbnailDiv.classList.add('cart-thumbnail')
    const locateThumbnail = document.querySelector('[data-thumbnails]').querySelector('[data-product="1"]')
    const cloneThisSrc = locateThumbnail.cloneNode(true)
    const thumbnailIMG = cloneThisSrc.childNodes[0]
    thumbnailDiv.appendChild(thumbnailIMG)

    //Cart details
    const cartDetails = document.createElement('div')
    cartDetails.classList.add('cart-details')
    // Title of product
    const productTitle = document.createElement('span')
    const dataProductName = document.querySelector('[data-product-name]')
    productTitle.textContent = dataProductName.dataset.productName
    cartDetails.appendChild(productTitle)

    // Price details
    const priceDetailsContainer = document.createElement('div')
    const itemPrice = document.createElement('span')
    const dataPrice = document.querySelector('[data-price]')
    itemPrice.textContent = dataPrice.dataset.price + ' x ' + quantity.dataset.quantity
    const itemTotal = document.createElement('span')
    const dataTotal = 125 * parseInt(quantity.dataset.quantity)
    itemTotal.textContent = ` $${dataTotal}.00`
    itemPrice.classList.add('item-price')
    itemTotal.classList.add('item-total')
    priceDetailsContainer.appendChild(itemPrice)
    priceDetailsContainer.appendChild(itemTotal)

    // Delete button
    const buttonDelete = document.createElement('button')
    const buttonDeleteImg = document.createElement('img')
    buttonDeleteImg.src = "/images/icon-delete.svg"
    buttonDelete.classList.add('delete-item')
    buttonDelete.appendChild(buttonDeleteImg)

    // append
    newList.appendChild(thumbnailDiv)
    newList.appendChild(cartDetails)
    cartDetails.appendChild(priceDetailsContainer)
    newList.appendChild(buttonDelete)

    cartList.appendChild(newList)
    isCartEmpty()
})


// Delete item from cart
cartList.addEventListener('click', event => {
    // If button is clicked or the img, ensure it has same target element
    if (event.target.classList.contains('delete-item') || event.target.parentNode.classList.contains('delete-item')) {
        let targetElement
        if (event.target.parentNode.classList.contains('delete-item')) {
            targetElement = event.target.parentNode
        }
        else {
            targetElement = event.target
        }
        // Delete the list, which is the product item in the cart
        targetElement.parentNode.remove()
    }
    isCartEmpty()
})


// If successful checkout
const checkout = document.querySelector('.checkout-button')
checkout.addEventListener('click', () => {
    if (cartList.children.length >= 1) {
        let checkoutTheseItems = Array.from(cartList.children)
        checkoutTheseItems.forEach(item => {
            item.remove()
        })
        alert('Thank you for your purchase!')
        isCartEmpty()
    }
})