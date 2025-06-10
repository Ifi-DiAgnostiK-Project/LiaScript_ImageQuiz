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

<div style="width: 100%; padding: 20px; border: 1px solid rgb(var(--color-highlight)); border-radius: 8px;">
    <div class="choices-container" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px;" id="quiz-@0">
    </div>
    <div class="feedback" style="margin-top: 20px; font-size:2em; font-weight: bold; text-align: center;">🤔</div>
</div>


<script>
void setTimeout(() => {
    (function(){
        const quizId = '@0';
        const container = document.querySelector(`#quiz-${quizId}`);
        container.innerHTML = "";

        const feedback = container.nextElementSibling;

        const correctAnswers = '@2'.split('|');
        const wrongAnswers = '@3'.split('|');
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

            img.addEventListener('click', () => {
                //mark choices
                if (img.classList.contains('choice-selected')) {
                    img.style.border = 'none';
                    img.classList.remove('choice-selected');
                } else {
                    img.style.border = '2px solid rgb(var(--color-highlight))';
                    img.classList.add('choice-selected');
                }

                const choices = Array
                                    .from(container.querySelectorAll('.choice-selected'))
                                    .map(el => el.src.split("/").pop());  

                console.log(choices);
                console.log(correctAnswers);
                const isCorrect = choices.length === correctAnswers.length && 
                                choices.every((answer) => correctAnswers.includes(answer));
                
                if (isCorrect) {
                    feedback.textContent = "✅";
                } else {
                    feedback.textContent = "❌";
                }
            });

            container.appendChild(img);
        });
        
    })();
}, 100);
</script>
@end
-->

# Image quiz

This is a template for image quizzes, where you can select a number of images just by clicking on them.

* See the Github version of this document [here...](https://github.com/wenik35/LiaScript_ImageQuiz/)
* See the LiaScript version of this document [here...](https://liascript.github.io/course/?https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/refs/heads/main/README.md)

To use these macros within your document, simply import it into LiaScript via:

`import: https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/refs/heads/main/README.md`


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
@basepath: https://raw.githubusercontent.com/wenik35/LiaScript_ImageQuiz/main/./img
mustang: @basepath/mustang.jpg
@f18: @basepath/f18.jpg
@chevrolet: @basepath/chevrolet.jpg
@ford: @basepath/ford.jpg
-->

Try to select the correct images!
(Hint: Cars are cool, but planes can fly!)

@selectimages(@uid,20,@mustang|@f18,@chevrolet|@ford)