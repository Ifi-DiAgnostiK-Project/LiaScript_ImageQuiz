/**
 * Shared quiz logic functions used across LiaScript Image Quiz macros.
 * These pure functions are inlined into the macro templates by the build script
 * and are independently testable via Jest.
 */

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
    isSelectionCorrect,
  };
}
