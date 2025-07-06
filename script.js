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

const responseKeywords = {
  flirty: [
    { keywords: ["spicy", "hot", "blush", "rose", "heart", "fall"], response: responses.flirty[0] },
    { keywords: ["blush", "shy", "cute"], response: responses.flirty[1] },
    { keywords: ["rose", "flower", "garden"], response: responses.flirty[2] },
    { keywords: ["heart", "beat", "love"], response: responses.flirty[3] },
    { keywords: ["fall", "crush", "like you"], response: responses.flirty[4] },
  ],
  funny: [
    { keywords: ["lol", "lmao", "funny", "crack", "joke"], response: responses.funny[0] },
    { keywords: ["10/10", "rate", "score"], response: responses.funny[1] },
    { keywords: ["comedian", "stand-up", "show"], response: responses.funny[2] },
    { keywords: ["giggle", "laugh", "haha"], response: responses.funny[3] },
    { keywords: ["day", "funny", "happy"], response: responses.funny[4] },
  ],
  angry: [
    { keywords: ["angry", "mad", "mood", "annoyed"], response: responses.angry[0] },
    { keywords: ["disappointed", "sad", "upset"], response: responses.angry[1] },
    { keywords: ["roast", "burn", "fight"], response: responses.angry[2] },
    { keywords: ["roll", "eyes", "ugh"], response: responses.angry[3] },
    { keywords: ["kill", "trouble", "danger"], response: responses.angry[4] },
  ],
  savage: [
    { keywords: ["mic", "drop", "savage"], response: responses.savage[0] },
    { keywords: ["ouch", "sting", "burn"], response: responses.savage[1] },
    { keywords: ["swing", "fight", "respect"], response: responses.savage[2] },
    { keywords: ["cold", "ex", "heart"], response: responses.savage[3] },
    { keywords: ["attitude", "serve", "sass"], response: responses.savage[4] },
  ],
  cute: [
    { keywords: ["aww", "sweet", "adorable"], response: responses.cute[0] },
    { keywords: ["smile", "goofball", "happy"], response: responses.cute[1] },
    { keywords: ["kitten", "cat", "cute"], response: responses.cute[2] },
    { keywords: ["sprinkles", "cupcake", "cake"], response: responses.cute[3] },
    { keywords: ["dance", "happy", "heart"], response: responses.cute[4] },
  ]
};

typeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    typeBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedType = btn.getAttribute('data-type');
  });
});

if (typeBtns[0]) typeBtns[0].classList.add('selected');

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

function getRandomResponse(type) {
  const arr = responses[type];
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSmartResponse(type, message) {
  const lowerMsg = message.toLowerCase();
  const mappings = responseKeywords[type] || [];
  for (let map of mappings) {
    for (let keyword of map.keywords) {
      if (lowerMsg.includes(keyword)) {
        return map.response;
      }
    }
  }
 
  return getRandomResponse(type);
}

function addChatBubble(message, sender = 'user', animate = false) {
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}`;

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
  setTimeout(() => {
    const response = getSmartResponse(selectedType, message);
    addChatBubble(response, 'response', true);
  }, 400);
});

userMessageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    getResponseBtn.click();
  }
}); 