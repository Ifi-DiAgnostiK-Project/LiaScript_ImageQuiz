<!--
author:   Niklas Werner
email:    niwer0305@gmx.de
version:  0.1
language: de
narrator: US English Female


@selectimages
<head>
    <style>
        .choice-selected {
            padding: 10px;
            border-radius: 4px;
            border: 1px solid rgb(var(--color-highlight));
            user-select: none;
        }
    </style>
</head>

<div style="width: 100%; padding: 20px; border: 1px solid rgb(var(--color-highlight)); border-radius: 8px;" id="quiz-@0">
    <div class="choices-container" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px;"></div>

    <div style="margin: 10px; display: flex; flex-direction: row; align-content: center;">
        <button class="lia-btn  lia-btn--outline lia-quiz__check">Prüfen</button>
        <span style="font-size: 1.5em" class="feedback"></span>
    </div>
</div>


<script>
void setTimeout(() => {
    (function(){
        const quizId = '@0';
        const quizContainer = document.querySelector(`#quiz-${quizId}`);
        const choicesContainer = quizContainer.querySelector('.choices-container');
        const feedback = quizContainer.querySelector('.feedback');

        choicesContainer.innerHTML = "";

        const correctAnswers = '@2'.split('|').map((url) => encodeURI(url.replace(" ", "")));
        const wrongAnswers = '@3'.split('|').map((url) => url.replace(" ", ""));

        const allAnswers = [...correctAnswers, ...wrongAnswers];

        //shuffle array
        for (var i = allAnswers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = allAnswers[i];
            allAnswers[i] = allAnswers[j];
            allAnswers[j] = temp;
        }

        allAnswers.forEach(answer => {
            const img = document.createElement('img');
            img.src = answer;
            img.style.width = '@1rem';
            img.style.padding = '5px';
            img.style.height = 'auto';
            img.style.borderRadius = '4px';
            img.style.margin = '0 auto';
            img.style.userSelect = 'none';
            img.style.cursor = "pointer";

            img.addEventListener('click', () => {
                //mark choices
                if (!quizContainer.classList.contains("disabled")){
                    if (img.classList.contains('choice-selected')) {
                        img.style.border = 'none';
                        img.classList.remove('choice-selected');
                    } else {
                        img.style.border = '2px solid rgb(var(--color-highlight))';
                        img.classList.add('choice-selected');
                    }
                }
            });

            choicesContainer.appendChild(img);
        });

        
        const checkingButton = quizContainer.querySelector('.lia-quiz__check');
        checkingButton.addEventListener("click", function (e) {
          const choices = Array
                              .from(choicesContainer.querySelectorAll('.choice-selected'))
                              .map(el => el.src);  

          const isCorrect = choices.length === correctAnswers.length && 
                          choices.every((answer) => correctAnswers.includes(answer));

          if (isCorrect) {
            feedback.textContent = "✅";

            checkingButton.setAttribute("disabled", "");

            quizContainer.style.borderColor = "rgb(var(--lia-grey))";
            quizContainer.classList.add("disabled");

            choicesContainer.querySelectorAll("*").forEach((element) => element.style.cursor = "default");
          } else {
            feedback.textContent = "❌";

            const buttonText = checkingButton.textContent.split(" ");
            const count = parseInt(buttonText[1] ?? "0") + 1;
            checkingButton.textContent = "Prüfen " + count.toString();
          }
        })        
    })();
}, 100);
</script>
@end

@selectimagezones
<div style="width: 100%;" id="quiz-@0">
    <img src="@1" usemap="#map-@0">
    <map id="map-@0" name="map-@0"></map>
</div>

<script>
void setTimeout(() => {
    (function(){
        const quizId = '@0';
        const quizContainer = document.querySelector(`#quiz-${quizId}`);
        const map = quizContainer.querySelector(`#map-${quizId}`);

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

            area.onclick = (() => {
                window.alert("Solution clicked!");
                area.classList.toggle("clicked");
            })

            map.appendChild(area);
        });
    })();
}, 100);
</script>
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

## Example
<!--
@chevrolet: https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/main/img/chevrolet.jpg
-->

Try to click the wheels and the front window!

@selectimagezones(@uid,@chevrolet,415;290;30|340;130;460;160|530;190;520;220;500;250;520;260;530;220)