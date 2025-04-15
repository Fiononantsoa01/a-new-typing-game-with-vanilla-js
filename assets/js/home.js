function changingMode() {
   let bodyElement = document.body;
    bodyElement.classList.toggle("dark-mode");
    
    // Get the button text bodyElement
   let buttonText = document.querySelector(".theme-mode button .nav-text");
    
    // Change the text based on current state
    if (bodyElement.classList.contains("dark-mode")) {
        buttonText.textContent = "Light mode";
    } else {
        buttonText.textContent = "Dark mode";
    }

   let buttonIcon = document.querySelector(".theme-mode button .nav-icon");
    
    // Change the text and icon based on current state
    if (bodyElement.classList.contains("dark-mode")) {
        buttonText.textContent = "Light mode";
        buttonIcon.classList.remove("fa-moon");
        buttonIcon.classList.add("fa-sun");
    } else {
        buttonText.textContent = "Dark mode";
        buttonIcon.classList.remove("fa-sun");
        buttonIcon.classList.add("fa-moon");
    }
}
