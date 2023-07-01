/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/


// Define Global Variables
const sections = document.querySelectorAll("section");
const navbar_list = document.getElementById("navbar__list");


// Main Functions
// build the nav
/*** Setps
 * Loop through each section and create a menu item for it
 * Get the id of the section and name of section from data-nav
 * Set the menu item attributes and content
 * Append the item to navList
 */ 
function createMenu(){
    // Loop through each section and create a menu item for it
    sections.forEach(function(section){
        const listItem = document.createElement("li");
        // Get the id of the section and title of section from data-nav
        const sec_id = section.getAttribute('id');
        const sec_title = section.getAttribute('data-nav');
        // Set the menu item attributes and content
        listItem.innerHTML = `<a class="menu__link" href="#${sec_id}">${sec_title}</a>`;
        // Append the item to navList
        navbar_list.appendChild(listItem);
    });
}


// Add class 'active' to section when near top of viewport
/*** Setps
 * Loop through each section and get rect bounding client of section
 * Remove active class from all sections use classList()
 * Checks if the section is near the top half of the viewport
 * Add active class to section
*/
function setActive(){
    // Loop through each section and get rect bounding client of section
    sections.forEach(function(section){
        const rect = section.getBoundingClientRect();
        // remove active class from all sections use classList()
        section.classList.remove("your-active-class");

        /*** Add an active state to your navigation items 
         * Check if the section is in the viewpost
         * Get the navLink of this section
         * Remove all active class from navLinks for all other sections
         * Add the active class to the navigation link of the active section
         */
        // Check
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {

            // Get the navLink of this section
            const navLink = navbar_list.querySelector(`a[href="#${section.id}"]`);
            // Remove all active class from navLinks for all other sections
            navbar_list.querySelectorAll("a").forEach(function(link){
                link.classList.remove("active");
            });
            // Add the active class to the navigation link of the active section
            if(navLink){
                navLink.classList.add("active");
            }

            // Add active class to section
            section.classList.add("your-active-class");
        }
    });
}


// Scroll to anchor ID using scrollTO event
/***
 * Check the event is triggered by an <a> element
 * Call scroll func with event of this a element
 * Stop default event
 * know id of the a element by use event.target
 * Select the section that have the this id
 * Go to this section smoothly
*/
function scrollToSection(event) {
    // Stop default event
    event.preventDefault();
    // know id of the a element by use event.target
    const targetId = event.target.getAttribute('href').substring(1);
    // Select the section that have the this id
    const targetSection = document.getElementById(targetId);
    // Go to this section smoothly
    targetSection.scrollIntoView({ behavior: 'smooth' });
}


// Events
// Build menu 
document.addEventListener("DOMContentLoaded", createMenu);

// Scroll to section on link click
navbar_list.addEventListener("click", function(event) {
    // Check the event is triggered by an <a> element
    if (event.target.nodeName === 'A') {
        // Call scroll func with event of this a element
        scrollToSection(event);
    }
});

// Set sections as active
window.addEventListener("scroll", setActive);

