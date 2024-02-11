function checkNames() {
    var name1 = document.getElementById("name1").value.trim();
    var name2 = document.getElementById("name2").value.trim();
    var name3 = document.getElementById("name3").value.trim();
    var name4 = document.getElementById("name4").value.trim();
    var name5 = document.getElementById("name5").value.trim();
    console.log("Name 1:", name1);
    console.log("Name 2:", name2);
    console.log("Name 3:", name3);
    console.log("Name 4:", name4);
    console.log("Name 5:", name5);

    // Check if names are correct
    if (name1.toLowerCase() === "dameor" && name2.toLowerCase() === "larce" 
    && name3.toLowerCase() === "evan" && name4.toLowerCase() === "zephyr"
    && name5.toLowerCase() === "mysteriouso"){
        document.getElementById("buttonContainer").style.display = "block"; // Show button container
    } else {
        alert("Incorrect names! Please try again."); // Display error message
    }
}

function redirectToAnotherPage() {
    // Redirect to another page
    window.location.href = "Treasure.html";
}