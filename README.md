<!--
author:   Niklas Werner
email:    niwer0305@gmx.de
version:  0.1
language: de
narrator: US English Female

@selectimages
<div style="width: 100%; padding: 20px; border: 1px solid rgb(var(--color-highlight)); border-radius: 8px;" id="quiz-@0">
    <div class="choices-container" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px;"></div>

    <div style="margin: 10px; display: flex; flex-direction: row; align-content: center;">
        <button class="lia-btn  lia-btn--outline lia-quiz__check">Prüfen</button>
        <br>
        <span class="feedback"></span>
    </div>
</div>


<script>
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

                    const isCorrect = choices.length === correctAnswers.length && 
                                    choices.every((answer) => correctAnswers.includes(answer));

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
@end

@selectimagezones
<div style="width: 100%;" id="quiz-@0">
    <img src="@1" id="img-@0" usemap="#map-@0">
    <map id="map-@0" name="map-@0"></map>
    <canvas id="canvas-@0" style="position:absolute; left:0; top:0; pointer-events:none;"></canvas>
    <br>
    <span id="feedback-@0">Noch keine Zonen gefunden.</span>
</div>

<script>
    const quizData = [];

    function drawShape(ctx, shape, coords) {
        ctx.beginPath();

        switch (shape) {
            case 'poly':
                ctx.moveTo(coords[0], coords[1]);
                for (let i = 2; i < coords.length; i = i+2) {
                    ctx.lineTo(coords[i], coords[i+1]);
                }
                ctx.lineTo(coords[0], coords[1]);
                break;
            case 'circle':
                let [x, y, r] = coords;
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                break;
            case 'rect':
                let [x1, y1, x2, y2] = coords;
                ctx.rect(x1, y1, x2 - x1, y2 - y1);
                break;
        }
        
        ctx.fill();
        ctx.stroke();
    }

    void setTimeout(() => {
        (function(){
            const quizId = '@0';
            const quizContainer = document.querySelector(`#quiz-${quizId}`);
            const img = quizContainer.querySelector(`#img-${quizId}`);
            const map = quizContainer.querySelector(`#map-${quizId}`);
            const feedback = quizContainer.querySelector(`#feedback-${quizId}`);

            const canvas = quizContainer.querySelector(`#canvas-${quizId}`);
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.style.left = img.offsetLeft + 'px';
            canvas.style.top = img.offsetTop + 'px';
            canvas.style.width = img.width + 'px';
            canvas.style.height = img.height + 'px';
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = 'green';
            ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
            ctx.lineWidth = 2;

            const dataKey = `quiz-${quizId}-data`;
            const savedData = JSON.parse(sessionStorage.getItem(dataKey)) ?? quizData;

            const areas = '@2'.replace(" ", "").split('|');

            areas.forEach(zone => {
                const coords = zone.split(";");

                const area = document.createElement('area');
                area.coords = coords.join(",");
                
                if (coords.length == 3) {
                    area.shape = "circle";
                } else if (coords.length == 4) {
                    area.shape = "rect";
                } else {
                    area.shape = "poly";
                };

                if (savedData.includes(area.coords)){
                    area.classList.add("found");

                    drawShape(ctx, area.shape, coords);

                    feedback.innerHTML = `${savedData.length} Zone(n) gefunden`;

                    if (savedData.length == areas.length){
                        feedback.innerHTML = "Alle Zonen gefunden!";
                        feedback.style.color = "rgb(var(--lia-success))";
                    }
                } else {
                    area.onclick = (() => {
                        if (!(area.classList.contains("found"))) {
                            area.classList.add("found");
                            savedData.push(area.coords);

                            drawShape(ctx, area.shape, coords);

                            feedback.innerHTML = `${savedData.length} Zone(n) gefunden`;

                            if (savedData.length == areas.length){
                                feedback.innerHTML = "Alle Zonen gefunden!";
                                feedback.style.color = "rgb(var(--lia-success))";
                            }

                            sessionStorage.setItem(dataKey, JSON.stringify(savedData));
                        };
                    });
                }

                map.appendChild(area);
            });

            
        })();
    }, 100);
</script>
@end


@style
.choice-selected {
    padding: 10px !important;
    border-radius: 4px !important;
    border: 2px solid rgb(var(--color-highlight));
}

.choices-container img {
    padding: 5px;
    height: auto;
    border-radius: 4px;
    margin: 0 auto;
    user-select: none;
    cursor: pointer;
}
@end

-->

# Welcome

This course contains makros for image quizzes.

* See the Github version of this document [here...](https://github.com/Ifi-DiAgnostiK-Project/LiaScript_ImageQuiz/)
* See the LiaScript version of this document [here...](https://liascript.github.io/course/?https://raw.githubusercontent.com/Ifi-DiAgnostiK-Project/LiaScript_ImageQuiz/refs/heads/main/README.md)

To use these macros within your document, simply import it into LiaScript via:

`import: https://raw.githubusercontent.com/Ifi-DiAgnostiK-Project/LiaScript_ImageQuiz/refs/heads/main/README.md`

# Image selection quiz

This is a quiz where you need to select the correct images by clicking on them.

## How to use

The makro takes four parameters:

`@selectimages(@uid,<size>,<correct>,<wrong>)`

, where

* `@uid` generates an id for the quiz which is important for correct implementation
* <size> specifies the image size in rem (line height)
* <correct> are the paths of the correct images, separated by (`|`)
* <wrong> are the paths of the incorrect images.

## Example
<!--
@basepath: https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/main/img
mustang: @basepath/mustang.jpg
f18: https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/main/img/f18.jpg
@chevrolet: @basepath/chevrolet.jpg
@ford: @basepath/ford.jpg
-->

Try to select the correct images!
(Hint: Cars are cool, but planes can fly!)

@selectimages(@uid,20,@mustang|@f18,@chevrolet|@ford)

# Image area quiz

This is a quiz where you need to click on the correct areas of one image.

## How to use

The makro takes three parameters:

`@selectimages(@uid,<image>,<zones>)`

, where

* `@uid` generates an id for the quiz which is important for correct implementation
* <image> specifies the path to the underlying image,
* <zones> are the clickable zones in the image.

Zones are defined by their pixel coordinates in the image. The coordinates are separated by `;`, multiple zones are separated by `|`.
There are 3 types of zones, defined by the number of their coordinates:
* circle: x1;y1;r
* rectangle: x1;y1;x2;y2
* polygon: x1;y1;x2;y2;x3;y3;...

[Here's a tool to generate the coordinate strings](https://wenik35.github.io/PathGen/)

## Example
<!--
@chevrolet: https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/main/img/chevrolet.jpg
-->

Try to click the wheels and the front window!

@selectimagezones(@uid,@chevrolet,421;297;48 | 336;122;467;168 | 498;244;518;221;528;191;536;208;537;233;531;258;506;262)