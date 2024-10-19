document.addEventListener('DOMContentLoaded', () => {
  const clipboardHistoryDiv = document.getElementById('clipboard-history');
  const readClipboardButton = document.getElementById('read-clipboard');
  const clearHistoryButton = document.getElementById('clear-history');
  const printHistoryButton = document.getElementById('print-history');  // New button reference

  // Check if elements exist before adding event listeners
  if (!clipboardHistoryDiv || !readClipboardButton || !clearHistoryButton || !printHistoryButton) {
    console.error('One or more required DOM elements are missing.');
    return;
  }

  // Function to load clipboard history from local storage
  function loadClipboardHistory() {
    const clipboardHistory = JSON.parse(localStorage.getItem('clipboardHistory')) || [];
    clipboardHistoryDiv.innerHTML = '';

    if (clipboardHistory.length === 0) {
      clipboardHistoryDiv.innerHTML = '<p>No items in clipboard history.</p>';
    } else {
      clipboardHistory.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('clipboard-item');
        div.innerText = item;
        div.addEventListener('click', () => {
          navigator.clipboard.writeText(item);
          alert(`Copied: "${item}"`);
        });
        clipboardHistoryDiv.appendChild(div);
      });
    }
  }

  // Function to add new item to clipboard history
  function addClipboardItem(text) {
    let clipboardHistory = JSON.parse(localStorage.getItem('clipboardHistory')) || [];
    
    // Prevent adding duplicate consecutive items
    if (clipboardHistory.length === 0 || clipboardHistory[0] !== text) {
      clipboardHistory.unshift(text);  // Add the new item at the beginning of the array
      localStorage.setItem('clipboardHistory', JSON.stringify(clipboardHistory));
    }
  }

  // Function to generate a downloadable text file from clipboard history
  function downloadClipboardHistoryAsText() {
    const clipboardHistory = JSON.parse(localStorage.getItem('clipboardHistory')) || [];

    if (clipboardHistory.length === 0) {
      alert('No items in clipboard history to download.');
      return;
    }

    // Prepare the content of the text file
    const content = clipboardHistory.map((item, index) => `${index + 1}: ${item}`).join('\n');
    
    // Create a Blob from the clipboard history
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clipboard_history.txt';  // File name
    document.body.appendChild(a);
    a.click();  // Trigger the download

    // Clean up by removing the link and revoking the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Event listener to read clipboard and store it in history
  readClipboardButton.addEventListener('click', async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      addClipboardItem(clipboardText);
      loadClipboardHistory();  // Refresh the history display
    } catch (error) {
      console.error('Failed to access clipboard data:', error);
      alert('Failed to access clipboard data. Please try again.');
    }
  });

  // Event listener to clear the clipboard history
  clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem('clipboardHistory');
    loadClipboardHistory();  // Refresh the history display
  });

  // Event listener to download clipboard history as a text file
  printHistoryButton.addEventListener('click', () => {
    downloadClipboardHistoryAsText();  // Generates and downloads the clipboard history as a text file
  });

  // Load clipboard history when popup opens
  loadClipboardHistory();
});
