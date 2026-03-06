/**
 * Shared quiz logic functions used across LiaScript Image Quiz macros.
 * These pure functions are inlined into the macro templates by the build script
 * and are independently testable via Jest.
 */

/**
 * Returns hint counts for the image selection quiz.
 * - correct: how many items in currentAnswers are in correctAnswers.
 * - wrong:   how many items in currentAnswers are NOT in correctAnswers.
 * - total:   how many correct answers are expected in total.
 * @param {string[]} currentAnswers - Currently selected answers.
 * @param {string[]} correctAnswers - Expected correct answers.
 * @returns {{correct: number, wrong: number, total: number}}
 */
function getSelectionHints(currentAnswers, correctAnswers) {
  const correct = currentAnswers.filter(a => correctAnswers.includes(a)).length;
  const wrong   = currentAnswers.filter(a => !correctAnswers.includes(a)).length;
  return { correct, wrong, total: correctAnswers.length };
}

/**
 * Checks whether the selected answers contain exactly the correct answers
 * (order-independent).
 * @param {string[]} currentAnswers - Currently selected answers.
 * @param {string[]} correctAnswers - Expected correct answers.
 * @returns {boolean}
 */
function isSelectionCorrect(currentAnswers, correctAnswers) {
  return (
    currentAnswers.length === correctAnswers.length &&
    currentAnswers.every((answer) => correctAnswers.includes(answer))
  );
}

if (typeof module !== "undefined") {
  module.exports = {
    getSelectionHints,
    isSelectionCorrect,
  };
}
