const responses = {
  flirty: [
    "Ooh, that's a spicy message! 😘",
    "You sure know how to make someone blush! 💖",
    "If I had a rose for every time I thought of you, I'd have a garden! 🌹",
    "You just made my heart skip a beat! 💓",
    "Stop it, you're making me fall for you! 😉"
  ],
  funny: [
    "LOL! You just cracked me up! 😂",
    "That's a 10/10 joke, would laugh again! 🤣",
    "You should be a stand-up comedian! 🎤",
    "I can't stop giggling at that! 😆",
    "You just made my day funnier! 😜"
  ],
  angry: [
    "Whoa, someone's in a mood! 😤",
    "I'm not mad, just... disappointed. 😑",
    "You better watch out, I'm about to roast you! 🔥",
    "Ugh, that message made me roll my eyes! 🙄",
    "If looks could kill, I'd be in trouble! 😠"
  ],
  savage: [
    "Did you just drop the mic? Because that was savage! 😏",
    "Ouch! That one stung a little! 😎",
    "You came in swinging! Respect. 👊",
    "That was colder than my ex's heart! 🥶",
    "You just served some serious attitude! 💅"
  ],
  cute: [
    "Aww, that's the sweetest thing ever! 🥰",
    "You just made me smile like a goofball! 😊",
    "That message is as cute as a kitten! 🐱",
    "You're the sprinkles to my cupcake! 🧁",
    "My heart just did a happy dance! 💃"
  ]
};

let selectedType = 'flirty';

const typeBtns = document.querySelectorAll('.type-btn');
const getResponseBtn = document.getElementById('getResponse');
const userMessageInput = document.getElementById('userMessage');
const chatArea = document.getElementById('chatArea');

// Handle type selection

typeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    typeBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedType = btn.getAttribute('data-type');
  });
});
// Set default selected
if (typeBtns[0]) typeBtns[0].classList.add('selected');

// Typing animation for chat bubble
function typeTextInBubble(text, element, speed = 28) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Generate response
function getRandomResponse(type) {
  const arr = responses[type];
  return arr[Math.floor(Math.random() * arr.length)];
}

function addChatBubble(message, sender = 'user', animate = false) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}`;
  // Add copy button for response bubbles
  let copyBtn = null;
  if (sender === 'response') {
    copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = function(e) {
      e.stopPropagation();
      navigator.clipboard.writeText(message).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 1200);
      });
    };
    bubble.appendChild(copyBtn);
  }
  // Add the message span for typing animation
  const msgSpan = document.createElement('span');
  msgSpan.className = 'bubble-text';
  if (animate) {
    typeTextInBubble(message, msgSpan);
  } else {
    msgSpan.textContent = message;
  }
  bubble.appendChild(msgSpan);
  chatArea.appendChild(bubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}

getResponseBtn.addEventListener('click', () => {
  const message = userMessageInput.value.trim();
  if (!message) return;
  addChatBubble(message, 'user');
  userMessageInput.value = '';
  // Simulate a short delay before response
  setTimeout(() => {
    const response = getRandomResponse(selectedType);
    addChatBubble(response, 'response', true);
  }, 400);
});

// Allow Enter key to trigger response
userMessageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    getResponseBtn.click();
  }
}); 