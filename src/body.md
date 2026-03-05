# LiaScript Image Quiz Makros

This course contains makros for image quizzes.

* See the Github version of this document [here...](https://github.com/Ifi-DiAgnostiK-Project/LiaScript_ImageQuiz/)
* See the LiaScript version of this document [here...](https://liascript.github.io/course/?https://raw.githubusercontent.com/Ifi-DiAgnostiK-Project/LiaScript_ImageQuiz/refs/heads/main/README.md)
* Developer guide (build, test, extend): [docs/development.md](docs/development.md)

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

`@selectimagezones(@uid,<image>,<zones>)`

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
