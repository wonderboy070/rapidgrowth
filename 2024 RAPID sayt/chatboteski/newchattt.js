const chatbotMessages = document.getElementById("chatbot-messages");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    // Foydalanuvchi xabari
    displayMessage(userText, "user-message");

    // Inputni tozalash
    userInput.value = "";

    // Bot javobi uchun vaqt belgilash
    setTimeout(() => {
        const botResponse = getBotResponse(userText);
        displayMessage(botResponse, "bot-message");
    }, 500);
}

function displayMessage(text, className) {
    const message = document.createElement("div");
    message.classList.add("message", className);
    message.innerText = text;
    chatbotMessages.appendChild(message);

    // So'nggi xabarga o'tish
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Bot javoblari
function getBotResponse(input) {
    // Oddiy javoblar to'plami
    const responses = {
        // Salom
        "salom": "Assalomu alaykum! Sizga qanday yordam bera olishim mumkin?, Bizning xizmatlar sizga qiziqmi? (Hello! How can I assist you? Are you interested in our services?)",
        "hello": "Hello! How can I assist you? Are you interested in our services?",

        // Xizmatlar
        "sizda qanday xizmatlar bor": "Bizda Professional Doctor, Advokat, Tarjimon xizmatlari mavjud. Sizga qanday mutaxassis kerak? (We have services of a Professional Doctor, Lawyer, and Translator. Which one do you need?)",
        "what services do you have": "We have services of a Professional Doctor, Lawyer, and Translator. Which one do you need?",

        // Doktor haqida batafsil
        "doktor haqida malumot": "Bizda bir necha yillik tajribaga ega bo'lgan professional shifokorlar mavjud. Sizni qiziqtirgan tibbiy yordamni so'rashingiz mumkin. (We have professional doctors with several years of experience. You can ask about the medical assistance you are interested in.)",
        "information about the doctor": "We have professional doctors with several years of experience. You can ask about the medical assistance you are interested in.",

        "doktorning yunalishi": "Doktorimizning yo'nalishi - kardiologiya, u yurak kasalliklari va sog'liqni yaxshilash bo'yicha ixtisoslashgan. (Our doctor's specialty is cardiology, focusing on heart diseases and health improvement.)",
        "what is the doctor's specialty": "Our doctor's specialty is cardiology, focusing on heart diseases and health improvement.",

        "doktorning malakasi": "Doktorimizning malakasi juda yuqori, u 20 yillik tajribaga ega va xalqaro sertifikatlarga ega. (Our doctor has a very high qualification, with 20 years of experience and international certifications.)",
        "what is the doctor's qualification": "Our doctor has a very high qualification, with 20 years of experience and international certifications.",

        "doktorning yoshi": "Doktorimiz 45 yoshda, u o'z sohasida tajribali va bilimli mutaxassis. (Our doctor is 45 years old, experienced and knowledgeable in their field.)",
        "what is the doctor's age": "Our doctor is 45 years old, experienced and knowledgeable in their field.",

        "doktorning telefon raqami": "Doktor bilan bog'lanish uchun telefon raqami: +998 90 123 45 67 (To contact the doctor, call: +998 90 123 45 67)",
        "what is the doctor's phone number": "To contact the doctor, call: +998 90 123 45 67",
        
        "doktor kasalliklarning kelib chiqishi haqida malumot": "Kasalliklar turli omillar tufayli paydo bo'lishi mumkin, jumladan infektsiyalar, genetik omillar, hayot tarzi va atrof-muhit ta'siri. Doktorimiz ushbu omillarni chuqur tahlil qilishga yordam beradi. (Diseases can arise due to various factors including infections, genetic factors, lifestyle, and environmental influences. Our doctor can provide a deep analysis of these factors.)",
        "brief information on causes of diseases": "Diseases can arise due to various factors including infections, genetic factors, lifestyle, and environmental influences. Our doctor can provide a deep analysis of these factors.",

        // Advokat haqida batafsil
        "advokat haqida malumot": "Bizning advokatlarimiz sizga qonuniy masalalarda yordam berishga tayyor, jumladan huquqiy maslahat, hujjatlarni tayyorlash va himoya xizmatlari. (Our lawyers are ready to assist you with legal matters, including legal advice, document preparation, and defense services.)",
        "information about the lawyer": "Our lawyers are ready to assist you with legal matters, including legal advice, document preparation, and defense services.",

        "advokatning yunalishi": "Advokatimizning yo'nalishi - fuqarolik va biznes huquqi. U moliyaviy, korporativ va mulkiy masalalar bo'yicha yordam beradi. (Our lawyer specializes in civil and business law. They provide assistance with financial, corporate, and property matters.)",
        "what is the lawyer's specialty": "Our lawyer specializes in civil and business law. They provide assistance with financial, corporate, and property matters.",

        "advokatning malakasi": "Advokatimiz 15 yillik tajribaga ega va ko'plab muvaffaqiyatli ishlari bilan tanilgan. (Our lawyer has 15 years of experience and is known for many successful cases.)",
        "what is the lawyer's qualification": "Our lawyer has 15 years of experience and is known for many successful cases.",

        "advokatning telefon raqami": "Advokat bilan bog'lanish uchun telefon raqami: +998 91 234 56 78 (To contact the lawyer, call: +998 91 234 56 78)",
        "what is the lawyer's phone number": "To contact the lawyer, call: +998 91 234 56 78",

        "advokat o'zbekiston respublikasi konstitutsiyasi qabul qilingan vaqt haqida ma'lumot": "O'zbekiston Respublikasi Konstitutsiyasi 1992-yil 8-dekabrda qabul qilingan. Bu sana har yili Konstitutsiya kuni sifatida nishonlanadi va mamlakatning asosiy qonuni sifatida O'zbekiston suvereniteti, demokratik qadriyatlari va fuqarolarining huquq va erkinliklarini belgilaydi. Konstitutsiya 6 ta bo'lim, 26 ta bob va 128 ta moddadan iborat. (The Constitution of the Republic of Uzbekistan was adopted on December 8, 1992. This date is celebrated annually as Constitution Day and marks the foundation of Uzbekistan's sovereignty, democratic values, and the rights and freedoms of its citizens.)",

        
        // Tarjimon haqida batafsil
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


        "tarjimon qaysi tillarni biladi": "Bizning tarjimonimiz ingliz, rus, fransuz tillarini mukammal biladi va huquqiy hamda tibbiy tarjimalar bo'yicha katta tajribaga ega. (Our translator is fluent in English, Russian, and French and has extensive experience in legal and medical translations.)",
        "which languages does the translator know": "Our translator is fluent in English, Russian, and French and has extensive experience in legal and medical translations.",

        // Other responses
        "rahmat": "Arzimaydi, sizga yordam bera olganimdan xursandman! (You're welcome, I'm glad I could help!)",
        "thank you": "You're welcome, I'm glad I could help!",

        "xayr": "Xayr! Sizga omad tilayman! (Goodbye! I wish you good luck!)",
        "goodbye": "Goodbye! I wish you good luck!",

        "qandaysiz": "Men AI chatbotman, shuning uchun his-tuyg'ularim yo'q, lekin rahmat! (I'm an AI chatbot, so I don't have feelings, but thank you!)",
        "how are you": "I'm an AI chatbot, so I don't have feelings, but thank you!",

        "ismingiz nima": "Men sizning yordamchi sun'iy intellekt chatbotman! (I am your assistant AI chatbot!)",
        "what is your name": "I am your assistant AI chatbot!"
    };

    // O'zbekcha yoki inglizcha javob yoki tushunmagan so'rovga javob
    return responses[input.toLowerCase()] || "Kechirasiz, men buni tushunmadim. Iltimos, boshqa usulda so'rab ko'ring. (Sorry, I don't understand that. Please try asking in a different way.)";
}
