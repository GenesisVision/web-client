import { emailRegex, generateRules, Rule } from "utils/validators/validators";

describe("Validators", () => {
  describe("generateRules", () => {
    it("required", () => {
      const required = "required";
      const rules = generateRules({ required });
      expect(rules.validate(undefined)).toBe(required);
      expect(rules.validate("")).toBe(required);
      expect(rules.validate(0)).toBe(required);
      expect(rules.validate("-")).toBe(true);
    });
    describe("number field", () => {
      it("min/max", () => {
        const min: Rule = {
          value: 3,
          message: "minMessage"
        };
        const max: Rule = {
          value: 10,
          message: "minMessage"
        };
        const rules = generateRules({ min, max });
        expect(rules.validate(+min.value - 1)).toBe(min.message);
        expect(rules.validate(+max.value + 1)).toBe(max.message);
        expect(rules.validate(5)).toBe(true);
      });
      it("lessThan/moreThan", () => {
        const moreThan: Rule = {
          value: 3,
          message: "minMessage"
        };
        const lessThan: Rule = {
          value: 10,
          message: "minMessage"
        };
        const rules = generateRules({ lessThan, moreThan });
        expect(rules.validate(moreThan.value)).toBe(moreThan.message);
        expect(rules.validate(lessThan.value)).toBe(lessThan.message);
        expect(rules.validate(5)).toBe(true);
      });
    });
    describe("string field", () => {
      describe("pattern", () => {
        it("email", () => {
          const pattern: Rule = {
            value: emailRegex,
            message: "patternMessage"
          };
          const rules = generateRules({ pattern });
          const validEmail = "mail@mail.mail";
          const invalidEmail = "mail@mail";
          expect(rules.validate(validEmail)).toBe(true);
          expect(rules.validate(invalidEmail)).toBe(pattern.message);
        });
        it("6 digits", () => {
          const pattern: Rule = {
            value: /^\d{6}$/,
            message: "patternMessage"
          };
          const rules = generateRules({ pattern });
          const validString = "111111";
          const invalidString = "111";
          expect(rules.validate(validString)).toBe(true);
          expect(rules.validate(invalidString)).toBe(pattern.message);
        });
      });
      it("minLength/maxLength", () => {
        const minLength: Rule = {
          value: 3,
          message: "minMessage"
        };
        const maxLength: Rule = {
          value: 10,
          message: "minMessage"
        };
        const rules = generateRules({ minLength, maxLength });
        expect(rules.validate("-".repeat(+minLength.value - 1))).toBe(
          minLength.message
        );
        expect(rules.validate("-".repeat(+maxLength.value + 1))).toBe(
          maxLength.message
        );
        expect(rules.validate("-".repeat(5))).toBe(true);
      });
    });
  });
});
