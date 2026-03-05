<div style="width: 100%; padding: 20px; border: 1px solid rgb(var(--color-highlight)); border-radius: 8px;" id="quiz-@0">
    <div class="choices-container" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px;"></div>

    <div style="margin: 10px; display: flex; flex-direction: row; align-content: center;">
        <button class="lia-btn  lia-btn--outline lia-quiz__check">Prüfen</button>
        <br>
        <span class="feedback"></span>
    </div>
</div>


<script>
    {{QUIZ_LOGIC}}

    const quizData = {
        solved: false,
        tries: 0,
        currentAnswer: [],
        order: null
    }

    function lockQuiz(feedback, checkingButton, quizContainer, choicesContainer){
        feedback.textContent = "Herzlichen Glückwunsch, das war die richtige Antwort";
        feedback.style.color = "rgb(var(--lia-success))";

        checkingButton.setAttribute("disabled", "");

        quizContainer.style.borderColor = "rgb(var(--lia-grey))";
        quizContainer.classList.add("disabled");

        choicesContainer.querySelectorAll("*").forEach((element) => element.style.cursor = "default");
    }

    void setTimeout(() => {
        (function(){
            const quizId = '@0';
            const quizContainer = document.querySelector(`#quiz-${quizId}`);
            const choicesContainer = quizContainer.querySelector('.choices-container');
            const feedback = quizContainer.querySelector('.feedback');
            const checkingButton = quizContainer.querySelector('.lia-quiz__check');

            const dataKey = `quiz-${quizId}-data`;
            const savedData = JSON.parse(sessionStorage.getItem(dataKey)) ?? quizData;

            choicesContainer.innerHTML = "";

            const correctAnswers = '@2'.split('|').map((url) => encodeURI(url.replace(" ", "")));
            const wrongAnswers = '@3'.split('|').map((url) => url.replace(" ", ""));
            const allAnswers = [...correctAnswers, ...wrongAnswers];

            let currentAnswer = savedData.currentAnswer;

            if (savedData.order === null) {
                //shuffle array
                for (var i = allAnswers.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = allAnswers[i];
                    allAnswers[i] = allAnswers[j];
                    allAnswers[j] = temp;
                }

                savedData.order = allAnswers;
            }

            if (savedData.tries > 0) {
                checkingButton.textContent = "Prüfen " + savedData.tries.toString();
                feedback.textContent = "Die richtige Antwort wurde noch nicht gegeben";
                feedback.style.color = "rgb(var(--lia-red))";
            }  

            savedData.order.forEach(answer => {
                const img = document.createElement('img');
                img.style.width = "@1rem";
                img.src = answer;
                if (currentAnswer.includes(answer)) {
                    img.classList.add('choice-selected');
                }

                img.addEventListener('click', () => {
                    //mark choices
                    if (!quizContainer.classList.contains("disabled")){
                        img.classList.toggle('choice-selected');
                    }
                });

                choicesContainer.appendChild(img);
            });

            if (savedData.solved) {
                lockQuiz(feedback, checkingButton, quizContainer, choicesContainer);
            } else {
                checkingButton.addEventListener("click", function (e) {
                    const choices = Array
                                        .from(choicesContainer.querySelectorAll('.choice-selected'))
                                        .map(el => el.src);  
                    savedData.currentAnswer = choices;

                    const isCorrect = isSelectionCorrect(choices, correctAnswers);

                    savedData.tries++;
                    checkingButton.textContent = "Prüfen " + savedData.tries.toString();

                    if (isCorrect) {
                        savedData.solved = true;
                        lockQuiz(feedback, checkingButton, quizContainer, choicesContainer);
                    } else {
                        feedback.textContent = "Die richtige Antwort wurde noch nicht gegeben";
                        feedback.style.color = "rgb(var(--lia-red))";
                    }

                    sessionStorage.setItem(dataKey, JSON.stringify(savedData));
                });    
            }
        })();
    }, 100);
</script>
