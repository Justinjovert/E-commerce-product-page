
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
})


/* 
 * Cycles through the images
 */

const mainDisplay = document.getElementById('mainDisplay')
mainDisplay.addEventListener('click', () => {
    displayImageContainer.style.display = 'block'
    overlay.style.display = 'block'
})



const buttons = document.querySelectorAll('[data-carousel-button]')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1
        const slides = button.closest('[data-carousel').querySelector('[data-slides]')

        const activeSlide = slides.querySelector('[data-active]')
        let index = [...slides.children].indexOf(activeSlide) + offset
        if(index < 0) index = slides.children.length - 1
        if(index >= slides.children.length) index = 0

        slides.children[index].dataset.active = 'true'
        delete activeSlide.dataset.active
    })
})