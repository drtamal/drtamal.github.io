function openTab(event, tabName) {
    // Declare variables
    var i, tabContent, tabLinks;

    // Get all elements with class="tab-content" and hide them
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tab-links" and remove the class "active"
    tabLinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    //document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
// Wait for the page to fully load before executing JavaScript
window.onload = function() {
    // Check if local storage is supported
    if (typeof(Storage) !== "undefined") {
        // Retrieve the current page count from local storage
        var pageCount = localStorage.getItem('pageCount');

        // If pageCount is null, initialize it to 0
        if (pageCount === null) {
            pageCount = 0;
        }

        // Increment the page count
        pageCount++;

        // Update the page counter element with the new count
        document.getElementById('page-counter').textContent = pageCount;

        // Store the updated page count in local storage
        localStorage.setItem('pageCount', pageCount);
    } else {
        // Local storage is not supported
        console.log("Local storage is not supported.");
    }
}
function doNothing(event) {
    event.preventDefault(); // Prevent the default behavior of the event
}
