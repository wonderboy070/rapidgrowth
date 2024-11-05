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
    document.getElementById("chatbot_toggle").children[0].style.display = "none";
    document.getElementById("chatbot_toggle").children[1].style.display = "";
    setTimeout(addResponseMsg, 1000, "Hi");
  } else {
    document.getElementById("chatbot").classList.add("collapsed");
    document.getElementById("chatbot_toggle").children[0].style.display = "";
    document.getElementById("chatbot_toggle").children[1].style.display = "none";
  }
};

// Function to calculate Levenshtein distance
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
function getBotResponse(input) {




















  
    var responses = {
        "salom": "Assalomu alaykum! Sizga qanday yordam bera olishim mumkin?, Bizning xizmatlar sizga qiziqmi?",
        "assalom alaykum": "Assalomu alaykum! Sizga qanday yordam bera olishim mumkin?, Bizning xizmatlar sizga qiziqmi?",

        "hello": "Hello! How can I assist you? Are you interested in our services?",
        "hi": "Hello! How can I assist you? Are you interested in our services?",
           
        // Doctor responses
        "doktor haqida malumot": "Bizda bir necha yillik tajribaga ega bo'lgan professional shifokorlar mavjud. Sizni qiziqtirgan tibbiy yordamni so'rashingiz mumkin. (We have professional doctors with several years of experience. You can ask about the medical assistance you are interested in.)",
        "information about the doctor": "We have professional doctors with several years of experience. You can ask about the medical assistance you are interested in.",
        "doktorning yunalishi": "Doktorimizning yo'nalishi - kardiologiya, u yurak kasalliklari va sog'liqni yaxshilash bo'yicha ixtisoslashgan. (Our doctor's specialty is cardiology, focusing on heart diseases and health improvement.)",
        "kardiolog":" yurak va qon tomirlari kasalliklarini tashxislash, davolash va oldini olishga ixtisoslashgan shifokor. (A cardiologist is a doctor who specializes in the diagnosis, treatment and prevention of diseases of the heart and blood vessels)",
        "what is the doctor's specialty": "Our doctor's specialty is cardiology, focusing on heart diseases and health improvement.",
        "doktorning malakasi": "Doktorimizning malakasi juda yuqori, u 20 yillik tajribaga ega va xalqaro sertifikatlarga ega. (Our doctor has a very high qualification, with 20 years of experience and international certifications.)",
        "what is the doctor's qualification": "Our doctor has a very high qualification, with 20 years of experience and international certifications.",
        "doktorning yoshi": "Doktorimiz 45 yoshda, u o'z sohasida tajribali va bilimli mutaxassis. (Our doctor is 45 years old, experienced and knowledgeable in their field.)",
        "what is the doctor's age": "Our doctor is 45 years old, experienced and knowledgeable in their field.",
        "doktorning telefon raqami": "Doktor bilan bog'lanish uchun telefon raqami: +998 90 123 45 67 (To contact the doctor, call: +998 90 123 45 67)",
        "what is the doctor's phone number": "To contact the doctor, call: +998 90 123 45 67",
        "kasalliklarning kelib chiqishi haqida malumot": "Kasalliklar turli omillar tufayli paydo bo'lishi mumkin, jumladan infektsiyalar, genetik omillar, hayot tarzi va atrof-muhit ta'siri. Doktorimiz ushbu omillarni chuqur tahlil qilishga yordam beradi. (Diseases can arise due to various factors including infections, genetic factors, lifestyle, and environmental influences. Our doctor can provide a deep analysis of these factors.)",
        "brief information on causes of diseases": "Diseases can arise due to various factors including infections, genetic factors, lifestyle, and environmental influences. Our doctor can provide a deep analysis of these factors.",
       
    // Doktor turlari haqida savol-javoblar
    "terapevt kim?": "Terapevt (General Practitioner) - umumiy kasalliklarni aniqlaydi va davolaydi.",
    "kardiolog kim?": "Kardiolog (Cardiologist) - yurak va qon tomir tizimi kasalliklarini davolaydi.",
    "nevropatolog kim?": "Nevropatolog (Neurologist) - asab tizimi kasalliklarini tashxislaydi va davolaydi.",
    "ortoped kim?": "Ortoped (Orthopedist) - suyaklar, mushaklar va bo‘g‘imlar kasalliklarini davolaydi.",
    "pediatr kim?": "Pediatr (Pediatrician) - bolalar sog‘ligi bilan shug‘ullanadi.",
    "ginekolog kim?": "Ginekolog (Gynecologist) - ayollar reproduktiv tizimi kasalliklarini davolaydi.",
    "endokrinolog kim?": "Endokrinolog (Endocrinologist) - gormonlar va endokrin tizim kasalliklari bilan shug‘ullanadi.",
    "dermatolog kim?": "Dermatolog (Dermatologist) - teri, tirnoq va soch kasalliklarini davolaydi.",
    "oftalmolog kim?": "Oftalmolog (Ophthalmologist) - ko‘z kasalliklarini tashxislaydi va davolaydi.",
    "psixiatr kim?": "Psixiatr (Psychiatrist) - ruhiy va psixologik kasalliklarni davolaydi.",
    "onkolog kim?": "Onkolog (Oncologist) - saraton kasalliklarini tashxislaydi va davolaydi.",
    "urolog kim?": "Urolog (Urologist) - siydik tizimi va erkaklar reproduktiv tizimi kasalliklari bilan shug‘ullanadi.",
    "gastroenterolog kim?": "Gastroenterolog (Gastroenterologist) - oshqozon-ichak kasalliklarini davolaydi.",
    "pulmonolog kim?": "Pulmonolog (Pulmonologist) - o‘pka va nafas olish tizimi kasalliklarini davolaydi.",

    // Inglizcha savol-javoblar
    "who is a general practitioner?": "A General Practitioner (Terapevt) diagnoses and treats general illnesses.",
    "who is a cardiologist?": "A Cardiologist (Kardiolog) treats heart and circulatory system diseases.",
    "who is a neurologist?": "A Neurologist (Nevropatolog) diagnoses and treats nervous system disorders.",
    "who is an orthopedist?": "An Orthopedist (Ortoped) treats bone, muscle, and joint issues.",
    "who is a pediatrician?": "A Pediatrician (Pediatr) specializes in children’s health.",
    "who is a gynecologist?": "A Gynecologist (Ginekolog) treats women’s reproductive health issues.",
    "who is an endocrinologist?": "An Endocrinologist treats hormone and endocrine system disorders.",
    "who is a dermatologist?": "A Dermatologist (Dermatolog) treats skin, nail, and hair issues.",
    "who is an ophthalmologist?": "An Ophthalmologist (Oftalmolog) diagnoses and treats eye disorders.",
    "who is a psychiatrist?": "A Psychiatrist (Psixiatr) treats mental and psychological illnesses.",
    "who is an oncologist?": "An Oncologist (Onkolog) diagnoses and treats cancer.",
    "who is a urologist?": "A Urologist (Urolog) treats urinary and male reproductive issues.",
    "who is a gastroenterologist?": "A Gastroenterologist (Gastroenterolog) treats gastrointestinal issues.",
    "who is a pulmonologist?": "A Pulmonologist (Pulmonolog) treats lung and respiratory disorders.",

        // Lawyer responses
        "advokat haqida malumot": "Bizning advokatlarimiz sizga qonuniy masalalarda yordam berishga tayyor, jumladan huquqiy maslahat, hujjatlarni tayyorlash va himoya xizmatlari. (Our lawyers are ready to assist you with legal matters, including legal advice, document preparation, and defense services.)",
        "information about the lawyer": "Our lawyers are ready to assist you with legal matters, including legal advice, document preparation, and defense services.",
        "advokatning yunalishi": "Advokatimizning yo'nalishi - fuqarolik va biznes huquqi. U moliyaviy, korporativ va mulkiy masalalar bo'yicha yordam beradi. (Our lawyer specializes in civil and business law. They provide assistance with financial, corporate, and property matters.)",
        "what is the lawyer's specialty": "Our lawyer specializes in civil and business law. They provide assistance with financial, corporate, and property matters.",
        "advokatning malakasi": "Advokatimiz 15 yillik tajribaga ega va ko'plab muvaffaqiyatli ishlari bilan tanilgan. (Our lawyer has 15 years of experience and is known for many successful cases.)",
        "what is the lawyer's qualification": "Our lawyer has 15 years of experience and is known for many successful cases.",
        "advokatning telefon raqami": "Advokat bilan bog'lanish uchun telefon raqami: +998 91 234 56 78 (To contact the lawyer, call: +998 91 234 56 78)",
        "what is the lawyer's phone number": "To contact the lawyer, call: +998 91 234 56 78",
    
        // Translator responses
        "tarjimon haqida malumot": "Professional tarjimonlarimiz hujjatlar, nutqlar va boshqa materiallarni tez va aniq tarjima qilishda yordam beradi. (Our professional translators help with the fast and accurate translation of documents, speeches, and other materials.)",
        "information about the translator": "Our professional translators help with the fast and accurate translation of documents, speeches, and other materials.",
        "tarjimonning yunalishi": "Tarjimonimiz asosan ingliz, rus va fransuz tillariga ixtisoslashgan, ayniqsa huquqiy va tibbiy tarjimalarda yuqori tajribaga ega. (Our translator specializes in English, Russian, and French, particularly with high experience in legal and medical translations.)",
        "what is the translator's specialty": "Our translator specializes in English, Russian, and French, particularly with high experience in legal and medical translations.",
        "tarjimonning malakasi": "Tarjimonimiz 10 yildan ortiq tajribaga ega va bir nechta xalqaro tashkilotlar bilan ishlagan. (Our translator has over 10 years of experience and has worked with several international organizations.)",
        "what is the translator's qualification": "Our translator has over 10 years of experience and has worked with several international organizations.",
        "tarjimonning yoshi": "Tarjimonimiz 35 yoshda, u o'z sohasida yuqori darajali mutaxassis. (Our translator is 35 years old, a highly qualified specialist in their field.)",
        "what is the translator's age": "Our translator is 35 years old, a highly qualified specialist in their field.",
        "tarjimonning telefon raqami": "Tarjimon bilan bog'lanish uchun telefon raqami: +998 93 345 67 89 (To contact the translator, call: +998 93 345 67 89)",
        "what is the translator's phone number": "To contact the translator, call: +998 93 345 67 89",
    
        // General responses
        "rahmat": "Arzimaydi, sizga yordam bera olganimdan xursandman! (You're welcome, I'm glad I could help!)",
        "thank you": "You're welcome, I'm glad I could help!",
        "xayr": "Xayr! Sizga omad tilayman! (Goodbye! I wish you good luck!)",
        "goodbye": "Goodbye! I wish you good luck!",
        "qandaysiz": "Men AI chatbotman, shuning uchun his-tuyg'ularim yo'q, lekin rahmat! (I'm an AI chatbot, so I don't have feelings, but thank you!)",
        "how are you": "I'm an AI chatbot, so I don't have feelings, but thank you!",
        "ismingiz nima": "Men sizning yordamchi sun'iy intellekt chatbotman! (I am your assistant AI chatbot!)",
        "what is your name": "I am your assistant AI chatbot!"
    };
    
    // Find the closest matching response
    function getBotResponse(input) {
        input = input.toLowerCase();
        let foundKey = Object.keys(responses).find(key => input.includes(key));
        return foundKey ? responses[foundKey] : "Kechirasiz, men bu savolni tushunmadim. (I'm sorry, I didn't understand that question.)";
    }
    

  // Find the closest match based on Levenshtein distance
  let closestMatch = "";
  let smallestDistance = Infinity;

  for (let key in responses) {
    let distance = levenshteinDistance(input, key);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestMatch = key;
    }
  }

  // Return the closest match if it's close enough, otherwise return a default response
  if (smallestDistance <= 3) {
    return responses[closestMatch];
  } else {
    return "Kechirasiz, men bu savolni tushunmadim. (I'm sorry, I didn't understand that question.)";
  }
}


