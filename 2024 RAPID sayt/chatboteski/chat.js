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
        "sizda qanday xizmatlar bor": "Bizda Professional Doctor, Advokat, Tarjimon xizmatlari mavjud. Sizga qaysi biri kerak? (We have services of a Professional Doctor, Lawyer, and Translator. Which one do you need?)",
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
   
// Kasb ro‘yxati va ularga tegishli javoblar
var professionResponses = {
    "terapevt": "Terapevt (General Practitioner) - umumiy kasalliklarni aniqlaydi va davolaydi.",
    "kardiolog": "Kardiolog (Cardiologist) - yurak va qon tomir tizimi kasalliklarini davolaydi.",
    "nevropatolog": "Nevropatolog (Neurologist) - asab tizimi kasalliklarini tashxislaydi va davolaydi.",
    "ortoped": "Ortoped (Orthopedist) - suyaklar, mushaklar va bo‘g‘imlar kasalliklarini davolaydi.",
    "pediatr": "Pediatr (Pediatrician) - bolalar sog‘ligi bilan shug‘ullanadi.",
    "ginekolog": "Ginekolog (Gynecologist) - ayollar reproduktiv tizimi kasalliklarini davolaydi.",
    "endokrinolog": "Endokrinolog (Endocrinologist) - gormonlar va endokrin tizim kasalliklari bilan shug‘ullanadi.",
    "dermatolog": "Dermatolog (Dermatologist) - teri, tirnoq va soch kasalliklarini davolaydi.",
    "oftalmolog": "Oftalmolog (Ophthalmologist) - ko‘z kasalliklarini tashxislaydi va davolaydi.",
    "psixiatr": "Psixiatr (Psychiatrist) - ruhiy va psixologik kasalliklarni davolaydi.",
    "onkolog": "Onkolog (Oncologist) - saraton kasalliklarini tashxislaydi va davolaydi.",
    "urolog": "Urolog (Urologist) - siydik tizimi va erkaklar reproduktiv tizimi kasalliklari bilan shug‘ullanadi.",
    "gastroenterolog": "Gastroenterolog (Gastroenterologist) - oshqozon-ichak kasalliklarini davolaydi.",
    "pulmonolog": "Pulmonolog (Pulmonologist) - o‘pka va nafas olish tizimi kasalliklarini davolaydi."
};

// Levenshtein masofasi hisoblash funksiyasi
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
var doctors = {
    terapevt: {
        title: "Terapevt",
        description: "Terapevt (General Practitioner) - umumiy kasalliklarni aniqlaydi va davolaydi.",
        name: "Dilshod Karimov",
        surname: "Karimov",
        age: 45,
        experience: 20, // Ish tajribasi yillarda
        phone: "+998901234567"
    },
    kardiolog: {
        title: "Kardiolog",
        description: "Kardiolog (Cardiologist) - yurak va qon tomir tizimi kasalliklarini davolaydi.",
        name: "Olimjon Raximov",
        surname: "Raximov",
        age: 50,
        experience: 25,
        phone: "+998901234568"
    },
    nevropatolog: {
        title: "Nevropatolog",
        description: "Nevropatolog (Neurologist) - asab tizimi kasalliklarini tashxislaydi va davolaydi.",
        name: "Gulnora Shodieva",
        surname: "Shodieva",
        age: 42,
        experience: 18,
        phone: "+998901234569"
    },
    ortoped: {
        title: "Ortoped",
        description: "Ortoped (Orthopedist) - suyaklar, mushaklar va bo‘g‘imlar kasalliklarini davolaydi.",
        name: "Rustam Abdullaev",
        surname: "Abdullaev",
        age: 48,
        experience: 22,
        phone: "+998901234570"
    },
    pediatr: {
        title: "Pediatr",
        description: "Pediatr (Pediatrician) - bolalar sog‘ligi bilan shug‘ullanadi.",
        name: "Zarina Mustafayeva",
        surname: "Mustafayeva",
        age: 39,
        experience: 15,
        phone: "+998901234571"
    },
    ginekolog: {
        title: "Ginekolog",
        description: "Ginekolog (Gynecologist) - ayollar reproduktiv tizimi kasalliklarini davolaydi.",
        name: "Saida Tursunova",
        surname: "Tursunova",
        age: 44,
        experience: 19,
        phone: "+998901234572"
    },
    endokrinolog: {
        title: "Endokrinolog",
        description: "Endokrinolog (Endocrinologist) - gormonlar va endokrin tizim kasalliklari bilan shug‘ullanadi.",
        name: "Ismoil Toshmatov",
        surname: "Toshmatov",
        age: 51,
        experience: 26,
        phone: "+998901234573"
    },
    dermatolog: {
        title: "Dermatolog",
        description: "Dermatolog (Dermatologist) - teri, tirnoq va soch kasalliklarini davolaydi.",
        name: "Nodira Abdullaeva",
        surname: "Abdullaeva",
        age: 38,
        experience: 14,
        phone: "+998901234574"
    },
    oftalmolog: {
        title: "Oftalmolog",
        description: "Oftalmolog (Ophthalmologist) - ko‘z kasalliklarini tashxislaydi va davolaydi.",
        name: "Komil Bekmurodov",
        surname: "Bekmurodov",
        age: 47,
        experience: 23,
        phone: "+998901234575"
    },
    psixiatr: {
        title: "Psixiatr",
        description: "Psixiatr (Psychiatrist) - ruhiy va psixologik kasalliklarni davolaydi.",
        name: "Malika G'aniyeva",
        surname: "G'aniyeva",
        age: 41,
        experience: 16,
        phone: "+998901234576"
    },
    onkolog: {
        title: "Onkolog",
        description: "Onkolog (Oncologist) - saraton kasalliklarini tashxislaydi va davolaydi.",
        name: "Azizbek Usmonov",
        surname: "Usmonov",
        age: 46,
        experience: 21,
        phone: "+998901234577"
    },
    urolog: {
        title: "Urolog",
        description: "Urolog (Urologist) - siydik tizimi va erkaklar reproduktiv tizimi kasalliklari bilan shug‘ullanadi.",
        name: "Javohir Saidov",
        surname: "Saidov",
        age: 43,
        experience: 17,
        phone: "+998901234578"
    },
    gastroenterolog: {
        title: "Gastroenterolog",
        description: "Gastroenterolog (Gastroenterologist) - oshqozon-ichak kasalliklarini davolaydi.",
        name: "Xurshid Abdug'aniyev",
        surname: "Abdug'aniyev",
        age: 52,
        experience: 27,
        phone: "+998901234579"
    },
    pulmonolog: {
        title: "Pulmonolog",
        description: "Pulmonolog (Pulmonologist) - o‘pka va nafas olish tizimi kasalliklarini davolaydi.",
        name: "Muhammadali Turg'unov",
        surname: "Turg'unov",
        age: 40,
        experience: 15,
        phone: "+998901234580"
    }
};

// Misol uchun: Kardiolog haqida ma'lumot olish
console.log(doctors.kardiolog);

// Kasblar ro'yxati
var professions = [
    { name: "Terapevt (General Practitioner)", keyword: "terapevt" },
    { name: "Kardiolog (Cardiologist)", keyword: "kardiolog" },
    { name: "Nevropatolog (Neurologist)", keyword: "nevropatolog" },
    { name: "Ortoped (Orthopedist)", keyword: "ortoped" },
    { name: "Pediatr (Pediatrician)", keyword: "pediatr" },
    { name: "Ginekolog (Gynecologist)", keyword: "ginekolog" },
    { name: "Endokrinolog (Endocrinologist)", keyword: "endokrinolog" },
    { name: "Dermatolog (Dermatologist)", keyword: "dermatolog" },
    { name: "Oftalmolog (Ophthalmologist)", keyword: "oftalmolog" },
    { name: "Psixiatr (Psychiatrist)", keyword: "psixiatr" },
    { name: "Onkolog (Oncologist)", keyword: "onkolog" },
    { name: "Urolog (Urologist)", keyword: "urolog" },
    { name: "Gastroenterolog (Gastroenterologist)", keyword: "gastroenterolog" },
    { name: "Pulmonolog (Pulmonologist)", keyword: "pulmonolog" }
];

// Harflar kiritilganda chaqiriladigan funksiya
function suggestProfessions(input) {
    var suggestions = professions.filter(profession => profession.keyword.startsWith(input));
    displaySuggestions(suggestions);
}

// Tavsiya etilgan kasblarni ekranga chiqarish
function displaySuggestions(suggestions) {
    var suggestionBox = document.getElementById("suggestion-box");
    suggestionBox.innerHTML = ""; // Oldingi tavsiyalarni tozalash
    suggestions.forEach(function(suggestion) {
        var div = document.createElement("div");
        div.innerText = suggestion.name;
        suggestionBox.appendChild(div);
    });
}

// Foydalanuvchi matn kiritganda chaqiriladi
document.getElementById("message").addEventListener("input", function() {
    var input = this.value.toLowerCase();
    suggestProfessions(input);
});

// Foydalanuvchi so‘rovi bilan eng yaqin kasbni topish
function findClosestProfession(input) {
    input = input.toLowerCase();
    let closestProfession = "";
    let smallestDistance = Infinity;

    for (let profession in professionResponses) {
        let distance = levenshteinDistance(input, profession);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestProfession = profession;
        }
    }

    // Agar eng yaqin masofa 3 dan kichik bo'lsa, mos keladigan kasbni qaytaradi
    if (smallestDistance <= 3) {
        return professionResponses[closestProfession];
    } else {
        return "Kechirasiz, men bu kasbni tushunmadim. (I'm sorry, I didn't understand that profession.)";
    }
}

// Chatbot javobini olish
function getBotResponse(input) {
    // Eng yaqin kasbni topadi
    return findClosestProfession(input);
}

// Misol uchun
console.log(getBotResponse("kardiyolog")); // Bu "Kardiolog"ga yaqin
console.log(getBotResponse("terapvett")); // Bu "Terapevt"ga yaqin
console.log(getBotResponse("gastroentrolog")); // Bu "Gastroenterolog"ga yaqin

    // O'zbekcha yoki inglizcha javob yoki tushunmagan so'rovga javob
    return responses[input.toLowerCase()] || "Kechirasiz, men buni tushunmadim. Iltimos, boshqa usulda so'rab ko'ring. (Sorry, I don't understand that. Please try asking in a different way.)";
}