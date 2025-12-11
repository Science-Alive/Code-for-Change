// This function runs once the HTML page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize a variable 
  let bookCount = 0;

  // 2. Get the elements from the DOM 
  const displayElement = document.getElementById('bookCountDisplay');
  const buttonElement = document.getElementById('addBookButton');

  // Make sure both elements exist before running the logic
  if (displayElement && buttonElement) {
    // 3. Define a function 
    function updateBookCount() {
      // Increment the variable
      bookCount++; 

      // Use DOM Manipulation to update the text on the page 
      displayElement.textContent = bookCount;
    }

    // 4. Attach the function to an event listener 
    buttonElement.addEventListener('click', updateBookCount);
  }
});
