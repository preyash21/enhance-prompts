console.log('Content script loaded');  // Debug log

function createEnhanceButton() {
  console.log('Creating enhance button...');
  const container = document.createElement('div');
  container.setAttribute('data-testid', 'system-hint-enhance');
  container.innerHTML = `
    <span class="inline-block" data-state="closed">
      <div class="radix-state-open:bg-black/10 inline-flex h-9 rounded-full border text-[13px] font-medium text-token-text-secondary border-token-border-default can-hover:hover:bg-token-main-surface-secondary focus-visible:outline-black dark:focus-visible:outline-white">
        <button class="flex h-full min-w-8 items-center justify-center p-2" aria-label="Enhance prompt">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm1-8h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3z" fill="currentColor"/>
          </svg>
          <span style="width: fit-content; opacity: 1; transform: none;">
            <div class="[display:var(--force-hide-label)] ps-1 pe-1 whitespace-nowrap">Enhance</div>
          </span>
        </button>
      </div>
    </span>
  `;

 const button = container.querySelector('button');
  button.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const promptArea = document.querySelector('#prompt-textarea');
    const prompt = promptArea?.textContent?.trim();
    
    if (!prompt) {
      alert('Please enter some text in the prompt area first.');
      return;
    }

    const res = await fetch('http://localhost:3000/api/enhance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

  // Initially hide the button
  container.style.display = 'none';

  // Function to toggle button visibility
  const toggleButtonVisibility = () => {
    const promptArea = document.querySelector('#prompt-textarea');
    const hasText = promptArea?.textContent?.trim()?.length > 0;
    container.style.display = hasText ? 'block' : 'none';
  };
  
  if (promptArea) {
    ['input', 'change', 'blur'].forEach(event => {
      promptArea.addEventListener(event, toggleButtonVisibility);
    });
  }
  

    const data = await res.json();
    if (data.enhanced) {
      // Set the enhanced text back to the contenteditable
      promptArea.textContent = data.enhanced;
      // Move cursor to end
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(promptArea);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      alert('Failed to enhance prompt.');
    }
  };

  // Find the composer footer actions container
  const footerActions = document.querySelector('[data-testid="composer-footer-actions"]');
  console.log('Footer actions found:', footerActions); // Debug log
  
  if (footerActions) {
    footerActions.insertBefore(container, footerActions.lastElementChild);
    console.log('Button inserted'); // Debug log
  }
}

if (document.querySelector('[data-testid="composer-footer-actions"]')) {
  console.log('Footer found immediately'); // Debug log
  createEnhanceButton();
}

// Use MutationObserver to handle dynamic loading
const observer = new MutationObserver((mutations) => {
  console.log('Mutation observed'); // Debug log
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node instanceof Element) {
        const footer = node.querySelector?.('[data-testid="composer-footer-actions"]') || node.matches?.('[data-testid="composer-footer-actions"]');
        
        if (footer) {
          console.log('Footer found by observer'); // Debug log
          createEnhanceButton();
          return;
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});