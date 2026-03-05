"use strict";

const {
  isSelectionCorrect,
} = require("../src/js/quiz-logic");

// ---------------------------------------------------------------------------
// isSelectionCorrect
// ---------------------------------------------------------------------------
describe("isSelectionCorrect", () => {
  test("returns true when selected set equals correct set (same order)", () => {
    expect(isSelectionCorrect(["a.jpg", "b.jpg"], ["a.jpg", "b.jpg"])).toBe(true);
  });

  test("returns true when selected set equals correct set (different order)", () => {
    expect(isSelectionCorrect(["b.jpg", "a.jpg"], ["a.jpg", "b.jpg"])).toBe(true);
  });

  test("returns false when a wrong answer is included", () => {
    expect(isSelectionCorrect(["a.jpg", "c.jpg"], ["a.jpg", "b.jpg"])).toBe(false);
  });

  test("returns false when too few answers are selected", () => {
    expect(isSelectionCorrect(["a.jpg"], ["a.jpg", "b.jpg"])).toBe(false);
  });

  test("returns false when too many answers are selected", () => {
    expect(isSelectionCorrect(["a.jpg", "b.jpg", "c.jpg"], ["a.jpg", "b.jpg"])).toBe(false);
  });

  test("returns true for empty selection when no correct answers expected", () => {
    expect(isSelectionCorrect([], [])).toBe(true);
  });

  test("returns false for empty selection when correct answers are expected", () => {
    expect(isSelectionCorrect([], ["a.jpg"])).toBe(false);
  });
});
