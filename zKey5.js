var buttonTexts = [
    "Do you",
    "really",
    "want",
    "to",
    "proceed?"
];

var currentIndex = 0; // Track the current index of buttonTexts array

// Function to create a button and append it to the container
function createButton() {
    var button = document.createElement("button");
    button.textContent = buttonTexts[currentIndex];
    button.onclick = function() {
        currentIndex++; // Move to the next button text
        if (currentIndex < buttonTexts.length) {
            createButton(); // Create the next button
        } else {
            window.location.href = "KFinalKey.html"; // Redirect when all buttons are clicked
        }
    };
    document.getElementById("ButtonContainer").appendChild(button);
}

// Call createButton function to start displaying buttons
createButton();
