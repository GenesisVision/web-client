import { getInputTag, getLastWord, getTagFromInputText } from "utils/parse";

describe("Test parser functions", () => {
  describe("Test getLastWord", () => {
    it("should be return last word with any separators", () => {
      const lastWord = "World";
      const string1 = "Hello  World";
      expect(getLastWord(string1)).toBe(lastWord);
      const string2 = "Hello\nWorld";
      expect(getLastWord(string2)).toBe(lastWord);
      const string3 = "Hello,World";
      expect(getLastWord(string3)).toBe(lastWord);
      const string4 = "Hello World";
      expect(getLastWord(string4)).toBe(lastWord);
      const string5 = "Hello\n\nWorld";
      expect(getLastWord(string5)).toBe(lastWord);
    });
    it("should be return last word as tag with any separators", () => {
      const lastWord = "@World";
      const string1 = "Hello  @World";
      expect(getLastWord(string1)).toBe(lastWord);
      const string2 = "Hello\n@World";
      expect(getLastWord(string2)).toBe(lastWord);
      const string3 = "Hello,@World";
      expect(getLastWord(string3)).toBe(lastWord);
      const string4 = "Hello @World";
      expect(getLastWord(string4)).toBe(lastWord);
      const string5 = "Hello\n\n@World";
      expect(getLastWord(string5)).toBe(lastWord);
    });
    it("should be return last word in one word line", () => {
      const lastWord = "World";
      const string1 = "World";
      expect(getLastWord(string1)).toBe(lastWord);
    });
    it("should be return last word in many words line", () => {
      const lastWord = "ligula.";
      const string1 =
        "Lorem ipsum dolor sit amet, a integer interdum, blandit a, nibh aliquam lorem ligula rhoncus tempus venenatis. Morbi augue enim scelerisque quisque nec tempor. Posuere cras ea malesuada. A nulla a habitant mi, a diam nulla per dapibus in, urna vestibulum. Sed donec morbi quis, lacus a nec, vel vel sagittis arcu sem, dapibus mollis vivamus maecenas id, leo ac vehicula sagittis class. Vestibulum porttitor sit erat fusce, consequat pellentesque velit et gravida egestas sed, cursus donec nam pede nec. Vivamus nunc mauris, elementum vel sit nunc dolor nec interdum, sagittis nunc pede nec fringilla sem amet. Eu lorem odio, rhoncus nonummy neque enim, nam tellus risus augue id, non aenean, ac nibh sem duis ligula.";
      expect(getLastWord(string1)).toBe(lastWord);
    });
  });
  describe("Test getInputTag", () => {
    it("should be return input tag name in any cases with @", () => {
      const tag1 = "@word";
      expect(getInputTag(tag1)).toBe("word");
      const tag2 = "@simpleWord";
      expect(getInputTag(tag2)).toBe("simpleWord");
      const tag3 = "@simple-word";
      expect(getInputTag(tag3)).toBe("simple-word");
      const tag4 = "@simple_word";
      expect(getInputTag(tag4)).toBe("simple_word");
      const tag5 = "@simple_word123";
      expect(getInputTag(tag5)).toBe("simple_word123");
      const tag6 = "@12312312123";
      expect(getInputTag(tag6)).toBe("12312312123");
    });
    it("should be return empty string for strings without @", () => {
      const tag1 = "word";
      expect(getInputTag(tag1)).toBe("");
      const tag2 = "1234";
      expect(getInputTag(tag2)).toBe("");
    });
    it("should be return empty string for strings with @ and without other symbols", () => {
      const tag1 = "@";
      expect(getInputTag(tag1)).toBe("");
    });
    it("should be return last word for strings with many @", () => {
      const tag1 = "@firstWord@secondWord";
      expect(getInputTag(tag1)).toBe("secondWord");
      const tag2 = "@firstWord@secondWord@thirdWord";
      expect(getInputTag(tag2)).toBe("thirdWord");
      const tag3 = "@firstWord@secondWord@thirdWord@fourthWord";
      expect(getInputTag(tag3)).toBe("fourthWord");
    });
  });
  describe("Test getTagFromInputText", () => {
    it("should be return tag name in text with tag in last word", () => {
      const text =
        "Lorem ipsum dolor sit amet, a integer interdum, blandit a, nibh aliquam lorem ligula rhoncus tempus venenatis. Morbi augue enim scelerisque quisque nec tempor. Posuere cras ea malesuada. A nulla a habitant mi, a diam nulla per dapibus in, urna vestibulum. Sed donec morbi quis, lacus a nec, vel vel sagittis arcu sem, dapibus mollis vivamus maecenas id, leo ac vehicula sagittis class. Vestibulum porttitor sit erat fusce, consequat pellentesque velit et gravida egestas sed, cursus donec nam pede nec. Vivamus nunc mauris, elementum vel sit nunc dolor nec interdum, sagittis nunc pede nec fringilla sem amet. Eu lorem odio, rhoncus nonummy neque enim, nam tellus risus augue id, non aenean, ac nibh sem duis @ligula";
      expect(getTagFromInputText(text)).toBe("ligula");
    });
    it("should be return tag name in text on word as tag", () => {
      const text = "@ligula";
      expect(getTagFromInputText(text)).toBe("ligula");
    });
    it("should be return empty string if tag not found in last word", () => {
      const text =
        "Lorem ipsum dolor sit amet, a integer interdum, blandit a, nibh aliquam lorem ligula rhoncus tempus venenatis. Morbi augue enim scelerisque quisque nec tempor. Posuere cras ea malesuada. A nulla a habitant mi, a diam nulla per dapibus in, urna vestibulum. Sed donec morbi quis, lacus a nec, vel vel sagittis arcu sem, dapibus mollis vivamus maecenas id, leo ac vehicula sagittis class. Vestibulum porttitor sit erat fusce, consequat pellentesque velit et gravida egestas sed, cursus donec nam pede nec. Vivamus nunc mauris, elementum vel sit nunc dolor nec interdum, sagittis nunc pede nec fringilla sem amet. Eu lorem odio, rhoncus nonummy neque enim, nam tellus risus augue id, non aenean, ac nibh sem duis ligula";
      expect(getTagFromInputText(text)).toBe("");
      const text2 = "Lorem";
      expect(getTagFromInputText(text2)).toBe("");
      const text3 = "@Lorem Lorem";
      expect(getTagFromInputText(text3)).toBe("");
      const text4 = "@Lorem @Lorem Lorem";
      expect(getTagFromInputText(text4)).toBe("");
      const text5 = "";
      expect(getTagFromInputText(text5)).toBe("");
    });
  });
});
