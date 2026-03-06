"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const README_PATH = path.join(ROOT, "README.md");

describe("build script", () => {
  let readmeContent;

  beforeAll(() => {
    // Run the build script and read the output
    execSync("node scripts/build.js", { cwd: ROOT });
    readmeContent = fs.readFileSync(README_PATH, "utf8");
  });

  test("README.md starts with a LiaScript HTML comment block", () => {
    expect(readmeContent.startsWith("<!--")).toBe(true);
  });

  test("README.md contains the YAML header fields", () => {
    expect(readmeContent).toContain("author:");
    expect(readmeContent).toContain("title: LiaScript Image Quiz Makros");
  });

  test("README.md contains both macro definitions", () => {
    expect(readmeContent).toContain("@selectimages");
    expect(readmeContent).toContain("@selectimagezones");
  });

  test("each macro definition is properly terminated with @end", () => {
    const macros = ["selectimages", "selectimagezones", "style"];
    macros.forEach((name) => {
      const startIdx = readmeContent.indexOf(`@${name}\n`);
      expect(startIdx).toBeGreaterThan(-1);
      const endIdx = readmeContent.indexOf("@end", startIdx);
      expect(endIdx).toBeGreaterThan(startIdx);
    });
  });

  test("README.md closes the header comment before the body", () => {
    const closeComment = readmeContent.indexOf("-->");
    const firstHeading = readmeContent.indexOf("# LiaScript Image Quiz Makros");
    expect(closeComment).toBeGreaterThan(-1);
    expect(firstHeading).toBeGreaterThan(closeComment);
  });

  test("README.md inlines the quiz logic function into the selectimages macro", () => {
    expect(readmeContent).toContain("function isSelectionCorrect(");
    expect(readmeContent).toContain("function getSelectionHints(");
  });

  test("selectimages macro shows hint counter beside Prüfen button", () => {
    const startIdx = readmeContent.indexOf("@selectimages\n");
    const endIdx = readmeContent.indexOf("@end", startIdx);
    const macro = readmeContent.slice(startIdx, endIdx);
    // Counter element present in HTML
    expect(macro).toContain('class="hint-counter"');
    // Logic function is present
    expect(macro).toContain("function getSelectionHints(");
    // updateHintCounter helper is wired up
    expect(macro).toContain("function updateHintCounter(");
    expect(macro).toContain("updateHintCounter(");
    // German wording for correct items
    expect(macro).toContain("Richtige");
    // German wording for wrong items
    expect(macro).toContain("Falscher");
  });

  test("README.md contains the body documentation sections", () => {
    expect(readmeContent).toContain("# Image selection quiz");
    expect(readmeContent).toContain("# Image area quiz");
  });

  test("README.md contains a link to the developer guide", () => {
    expect(readmeContent).toContain("docs/development.md");
  });

  test("README.md contains the @style macro with quiz CSS", () => {
    const styleStart = readmeContent.indexOf("@style\n");
    expect(styleStart).toBeGreaterThan(-1);
    const styleEnd = readmeContent.indexOf("@end", styleStart);
    const styleBlock = readmeContent.slice(styleStart, styleEnd);
    expect(styleBlock).toContain(".choice-selected");
    expect(styleBlock).toContain(".choices-container img");
  });
});
