var running = false;
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US'; // Set default language for voice recognition
recognition.continuous = false;

function send() {
  if (running) return;
  var msg = document.getElementById("message").value;
  if (msg === "") return;
  running = true;
  addMsg(msg);

  // Detect language and get bot response
  var detectedLanguage = detectLanguage(msg);
  var response = getBotResponse(msg.toLowerCase(), detectedLanguage);
  
  window.setTimeout(() => {
    addResponseMsg(response);
    speak(response, detectedLanguage); // Speak the bot's response in the detected language
  }, 1000);
}

function addMsg(msg) {
  var div = document.createElement("div");
  div.innerHTML =
    "<span style='flex-grow:1'></span><div class='chat-message-sent'>" +
    "<i class='material-icons' style='color: #007bff; margin-right: 8px;'>person</i>" +
    msg +
    "</div>";
  div.className = "chat-message-div";
  document.getElementById("message-box").appendChild(div);
  document.getElementById("message").value = "";
  document.getElementById("message-box").scrollTop = document.getElementById(
    "message-box"
  ).scrollHeight;
}

function addResponseMsg(msg) {
  var div = document.createElement("div");
  div.innerHTML =
    "<div class='chat-message-received'>" +
    "<i class='material-icons' style='color: #28a745; margin-right: 8px;'>smart_toy</i>" +
    msg +
    "</div>";
  div.className = "chat-message-div";
  document.getElementById("message-box").appendChild(div);
  document.getElementById("message-box").scrollTop = document.getElementById(
    "message-box"
  ).scrollHeight;
  running = false;
}

document.getElementById("message").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    send();
  }
});

document.getElementById("chatbot_toggle").onclick = function () {
  if (document.getElementById("chatbot").classList.contains("collapsed")) {
    document.getElementById("chatbot").classList.remove("collapsed");
    document.getElementById("chatbot_toggle").children[0].style.display = "none";
    document.getElementById("chatbot_toggle").children[1].style.display = "";
    setTimeout(() => addResponseMsg("Hi"), 1000);
  } else {
    document.getElementById("chatbot").classList.add("collapsed");
    document.getElementById("chatbot_toggle").children[0].style.display = "";
    document.getElementById("chatbot_toggle").children[1].style.display = "none";
  }
};

// Add a button to start voice input
document.getElementById("voice_button").onclick = function () {
  recognition.start();
};

// Speech recognition event handler
recognition.onresult = function (event) {
  var transcript = event.results[0][0].transcript;
  document.getElementById("message").value = transcript;
  send();
};

// Detect input language based on text content
function detectLanguage(text) {
  const uzbekKeywords = ["salom", "rahmat", "xayr", "qandaysiz"];
  const isUzbek = uzbekKeywords.some(keyword => text.includes(keyword));
  return isUzbek ? 'uz-UZ' : 'en-US';
}

// Speech synthesis for bot responses
function speak(text, language) {
  var speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = language; // Use the detected language for speech output
  window.speechSynthesis.speak(speech);
}

// Function to calculate Levenshtein distance (unchanged)
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  let matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

// Bot response function with typo tolerance
function getBotResponse(input, language) {
    var responses = {
        "uz-UZ": {
            "salom": "Assalomu alaykum! Sizga qanday yordam bera olishim mumkin?, Bizning xizmatlar sizga qiziqmi?",
            "rahmat": "Arzimaydi, sizga yordam bera olganimdan xursandman!",
            "xayr": "Xayr! Sizga omad tilayman!",
            "qandaysiz": "Men AI chatbotman, shuning uchun his-tuyg'ularim yo'q, lekin rahmat!"
        },
        "en-US": {
            "hello": "Hello! How can I assist you? Are you interested in our services?",
            "thank you": "You're welcome, I'm glad I could help!",
            "goodbye": "Goodbye! I wish you good luck!",
            "how are you": "I'm an AI chatbot, so I don't have feelings, but thank you!"
        }
    };

  let languageResponses = responses[language] || responses["en-US"];
  let closestMatch = "";
  let smallestDistance = Infinity;

  for (let key in languageResponses) {
    let distance = levenshteinDistance(input, key);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestMatch = key;
    }
  }

  return smallestDistance <= 3 ? languageResponses[closestMatch] : "Kechirasiz, men bu savolni tushunmadim. (I'm sorry, I didn't understand that question.)";
}
