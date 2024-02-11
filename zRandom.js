function changeMessage() {
    var link = document.querySelector('.backhomepage a');
    link.textContent = "=====>Something is preventing you from going back"; // Change the text content of the anchor element

    // Create a button dynamically
    var button = document.createElement("button");
    button.textContent = "Proceed"; // Button text
    button.onclick = function() {
        window.location.href = "IzName5.html"; // Redirect to another website
    };
    document.getElementById("buttonContainer").appendChild(button); // Append button to the container
}