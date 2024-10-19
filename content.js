// Create a new image element for Chirpy
const chirpyImage = document.createElement('img');
chirpyImage.src = 'https://art.pixilart.com/sr249f0193ba3aws3.png';  // External URL to the bird image
chirpyImage.alt = 'Chirpy';
chirpyImage.id = 'chirpy-bird';

// Style the image by applying the chirpy class (positioned at the bottom-right)
chirpyImage.style.position = 'fixed';
chirpyImage.style.bottom = '20px'; // Positioning 20px from the bottom
chirpyImage.style.right = '20px'; // Positioning 20px from the right
chirpyImage.style.width = '60px'; // Set the size of the bird
chirpyImage.style.opacity = '0.8'; // Make it slightly transparent
chirpyImage.style.cursor = 'pointer'; // Make it clickable
chirpyImage.style.zIndex = '1000'; // Ensure it appears on top of other elements

// Append Chirpy to the body of the page
document.body.appendChild(chirpyImage);

// Add a click event to open the clipboard popup when Chirpy is clicked
chirpyImage.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'open_popup' });
});

