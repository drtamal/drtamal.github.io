// Get the page counter element
var pageCounter = document.getElementById('page-counter');

// Check if page counter exists
if (pageCounter) {
    // Get the current page count from local storage or initialize it to 0
    var pageCount = localStorage.getItem('pageCount') || 0;

    // Increment the page count
    pageCount++;

    // Update the page counter element with the new count
    pageCounter.textContent = pageCount;

    // Store the updated page count in local storage
    localStorage.setItem('pageCount', pageCount);
}
