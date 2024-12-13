$(document).ready(function () {
    const wordsByDifficulty = {
        easy: [
            { word: "cat", translation: "кіт" },
            { word: "dog", translation: "собака" },
            { word: "sun", translation: "сонце" },
            { word: "book", translation: "книга" },
            { word: "tree", translation: "дерево" },
            { word: "car", translation: "машина" },
            { word: "chair", translation: "стілець" },
            { word: "table", translation: "стіл" },
            { word: "milk", translation: "молоко" },
            { word: "water", translation: "вода" }
        ],
        medium: [
            { word: "sometimes", translation: "іноді" },
            { word: "usually", translation: "зазвичай" },
            { word: "rarely", translation: "рідко" },
            { word: "easily", translation: "легко" },
            { word: "quickly", translation: "швидко" },
            { word: "slowly", translation: "повільно" },
            { word: "cloudy", translation: "хмарно" },
            { word: "rainy", translation: "дощовий" },
            { word: "windy", translation: "вітряний" },
            { word: "snowy", translation: "сніжний" }
        ],
        hard: [
            { word: "astonished", translation: "зачарований" },
            { word: "meticulous", translation: "ретельний" },
            { word: "perseverance", translation: "наполегливість" },
            { word: "complicated", translation: "складний" },
            { word: "articulate", translation: "чіткий" },
            { word: "exaggerate", translation: "перебільшувати" },
            { word: "ambiguous", translation: "двозначний" },
            { word: "superfluous", translation: "зайвий" },
            { word: "notorious", translation: "відомий" },
            { word: "subtle", translation: "тонкий" }
        ]
    };

    let words = [];
    let currentIndex = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    function updateCard() {
        $("#word-display").text(words[currentIndex].word);
        $("#progress-text").text(`${currentIndex + 1}/${words.length}`);
    }

    function showModal() {
        const level = correctAnswers >= 8 ? "Високий" : correctAnswers >= 5 ? "Середній" : "Початковий";
        $("#result-text").text(`Ваш рівень: ${level}`);
        $("#result-modal").fadeIn();
    }

    $("#difficulty").change(function () {
        const selectedDifficulty = $(this).val();
        words = [...wordsByDifficulty[selectedDifficulty]];
        words.sort(() => Math.random() - 0.5); // Перемішати слова
        currentIndex = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        $("#correct-count").text(correctAnswers);
        $("#wrong-count").text(wrongAnswers);
        updateCard();
    });

    $("#check-button").click(function () {
        const userTranslation = $("#translation-input").val().trim().toLowerCase();
        if (userTranslation === words[currentIndex].translation.toLowerCase()) {
            correctAnswers++;
            $("#correct-count").text(correctAnswers);
        } else {
            wrongAnswers++;
            $("#wrong-count").text(wrongAnswers);
        }
        currentIndex++;
        if (currentIndex < words.length) {
            updateCard();
            $("#translation-input").val("");
        } else {
            showModal();
        }
    });

    $("#close-modal").click(function () {
        $("#result-modal").fadeOut();
    });

    // Ініціалізація гри з легким рівнем за замовчуванням
    $("#difficulty").val("easy").change();
});
