var running = false;
function send() {
  if (running == true) return;
  var msg = document.getElementById("message").value;
  if (msg == "") return;
  running = true;
  addMsg(msg);
  // Get bot response
  var response = getBotResponse(msg.toLowerCase());
  window.setTimeout(addResponseMsg, 1000, response);
}

function addMsg(msg) {
  var div = document.createElement("div");
  div.innerHTML =
    "<span style='flex-grow:1'></span><div class='chat-message-sent'>" +
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
  div.innerHTML = "<div class='chat-message-received'>" + msg + "</div>";
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
    document.getElementById("chatbot_toggle").children[0].style.display =
      "none";
    document.getElementById("chatbot_toggle").children[1].style.display = "";
    setTimeout(addResponseMsg, 1000, "Hi");
  } else {
    document.getElementById("chatbot").classList.add("collapsed");
    document.getElementById("chatbot_toggle").children[0].style.display = "";
    document.getElementById("chatbot_toggle").children[1].style.display = "none";
  }
};

// Bot response function
function getBotResponse(input) {
  const responses = {
    "salom": "Assalomu alaykum! Sizga qanday yordam bera olishim mumkin?, Bizning xizmatlar sizga qiziqmi?",
    "hello": "Hello! How can I assist you? Are you interested in our services?",
    "sizda qanday xizmatlar bor": "Bizda Professional Doctor, Advokat, Tarjimon xizmatlari mavjud.",
    "what services do you have": "We have services of a Professional Doctor, Lawyer, and Translator.",
    "doktor haqida malumot": "Bizda bir necha yillik tajribaga ega bo'lgan professional shifokorlar mavjud.",
    "information about the doctor": "We have professional doctors with several years of experience.",
    "doktorning yunalishi": "Doktorimizning yo'nalishi - kardiologiya.",
    "what is the doctor's specialty": "Our doctor's specialty is cardiology.",
    "doktorning malakasi": "Doktorimizning malakasi juda yuqori.",
    "what is the doctor's qualification": "Our doctor has a very high qualification.",
    "doktorning yoshi": "Doktorimiz 45 yoshda.",
    "what is the doctor's age": "Our doctor is 45 years old.",
    "doktorning telefon raqami": "Doktor bilan bog'lanish uchun telefon raqami: +998 90 123 45 67",
    "what is the doctor's phone number": "To contact the doctor, call: +998 90 123 45 67",
    "doktor kasalliklarning kelib chiqishi haqida malumot": "Kasalliklar turli omillar tufayli paydo bo'lishi mumkin.",
    "brief information on causes of diseases": "Diseases can arise due to various factors.",
    "advokat haqida malumot": "Bizning advokatlarimiz sizga qonuniy masalalarda yordam berishga tayyor.",
    "information about the lawyer": "Our lawyers are ready to assist you with legal matters.",
    "advokatning yunalishi": "Advokatimizning yo'nalishi - fuqarolik va biznes huquqi.",
    "what is the lawyer's specialty": "Our lawyer specializes in civil and business law.",
    "advokatning malakasi": "Advokatimiz 15 yillik tajribaga ega.",
    "what is the lawyer's qualification": "Our lawyer has 15 years of experience.",
    "advokatning telefon raqami": "Advokat bilan bog'lanish uchun telefon raqami: +998 91 234 56 78",
    "what is the lawyer's phone number": "To contact the lawyer, call: +998 91 234 56 78",
    "tarjimon haqida malumot": "Professional tarjimonlarimiz hujjatlar, nutqlarni tarjima qiladi.",
    "information about the translator": "Our professional translators help with fast and accurate translation.",
    "tarjimonning yunalishi": "Tarjimonimiz asosan ingliz, rus va fransuz tillariga ixtisoslashgan.",
    "what is the translator's specialty": "Our translator specializes in English, Russian, and French.",
    "tarjimonning malakasi": "Tarjimonimiz 10 yildan ortiq tajribaga ega.",
    "what is the translator's qualification": "Our translator has over 10 years of experience.",
    "tarjimonning yoshi": "Tarjimonimiz 35 yoshda.",
    "what is the translator's age": "Our translator is 35 years old.",
    "tarjimonning telefon raqami": "Tarjimon bilan bog'lanish uchun telefon raqami: +998 93 345 67 89",
    "what is the translator's phone number": "To contact the translator, call: +998 93 345 67 89",
    "tarjimon qaysi tillarni biladi": "Bizning tarjimonimiz ingliz, rus, fransuz tillarini mukammal biladi.",
    "which languages does the translator know": "Our translator is fluent in English, Russian, and French.",
    "rahmat": "Arzimaydi, sizga yordam bera olganimdan xursandman!",
    "thank you": "You're welcome, I'm glad I could help!",
    "xayr": "Xayr! Sizga omad tilayman!",
    "goodbye": "Goodbye! I wish you good luck!",
    "qandaysiz": "Men AI chatbotman, shuning uchun his-tuyg'ularim yo'q.",
    "how are you": "I'm an AI chatbot, so I don't have feelings.",
    "ismingiz nima": "Men sizning yordamchi sun'iy intellekt chatbotman!",
    "what is your name": "I am your assistant AI chatbot!"
  };
  return responses[input] || "Kechirasiz, men bu savolni tushunmadim. (I'm sorry, I didn't understand that question.)";
}
