"use strict";

const {
  getSelectionHints,
  isSelectionCorrect,
} = require("../src/js/quiz-logic");

// ---------------------------------------------------------------------------
// getSelectionHints
// ---------------------------------------------------------------------------
describe("getSelectionHints", () => {
  test("returns correct=0, wrong=0, total=N when nothing is selected", () => {
    expect(getSelectionHints([], ["a.jpg", "b.jpg", "c.jpg"])).toEqual({ correct: 0, wrong: 0, total: 3 });
  });

  test("returns correct=N, wrong=0, total=N when all correct answers are selected", () => {
    expect(getSelectionHints(["a.jpg", "b.jpg"], ["a.jpg", "b.jpg"])).toEqual({ correct: 2, wrong: 0, total: 2 });
  });

  test("counts correctly-selected vs wrongly-selected images", () => {
    expect(getSelectionHints(["a.jpg", "x.jpg", "b.jpg"], ["a.jpg", "b.jpg", "c.jpg"])).toEqual({ correct: 2, wrong: 1, total: 3 });
  });

  test("all wrong: correct=0, wrong=N", () => {
    expect(getSelectionHints(["x.jpg", "y.jpg"], ["a.jpg", "b.jpg"])).toEqual({ correct: 0, wrong: 2, total: 2 });
  });

  test("partial correct: one correct, none wrong", () => {
    expect(getSelectionHints(["b.jpg"], ["a.jpg", "b.jpg", "c.jpg"])).toEqual({ correct: 1, wrong: 0, total: 3 });
  });

  test("returns total=0 when no correct answers are expected", () => {
    expect(getSelectionHints([], [])).toEqual({ correct: 0, wrong: 0, total: 0 });
  });
});

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
