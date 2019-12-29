import { shallow } from "enzyme";
import * as React from "react";

import BaseProfitability from "./base-profitability";
import { _Profitability as Profitability } from "./profitability";
import {
  arrows,
  composeProfitabilityPrefix,
  noPrefix,
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT,
  signs
} from "./profitability.helper";

const content = <>content</>;
const anyClass = "anyClass";
const variant = PROFITABILITY_VARIANT.CHIPS;

describe("Profitability tests", () => {
  describe("Profitability component tests", () => {
    const value = "12";

    test("should render Profitability", () => {
      const component = shallow(
        <Profitability value={value}>{content}</Profitability>
      );
      expect(component.find(BaseProfitability)).toHaveLength(1);
    });
    test("should set className", () => {
      const component = shallow(
        <Profitability value={value} className={anyClass}>
          {content}
        </Profitability>
      );
      expect(component.find(`.${anyClass}`)).toHaveLength(1);
    });
    test("should set variant prop", () => {
      const component = shallow(
        <Profitability value={value} variant={variant}>
          {content}
        </Profitability>
      );
      expect(component.find(BaseProfitability).prop("variant")).toEqual(
        variant
      );
    });
    test("should render prefix", () => {
      const prefix = PROFITABILITY_PREFIX.SIGN;
      const component = shallow(
        <Profitability value={value} prefix={prefix}>
          {content}
        </Profitability>
      );
      expect(component.text()).toEqual(expect.stringContaining(signs.positive));
    });
  });

  describe("BaseProfitability component tests", () => {
    const isNegative = true;
    const isPositive = true;

    test("should render BaseProfitability", () => {
      const component = shallow(
        <BaseProfitability isNegative={!isPositive} isPositive={isPositive}>
          {content}
        </BaseProfitability>
      );
      expect(component.find(".profitability")).toHaveLength(1);
    });
    test("should set className", () => {
      const component = shallow(
        <BaseProfitability
          isNegative={!isPositive}
          isPositive={isPositive}
          className={anyClass}
        >
          {content}
        </BaseProfitability>
      );
      expect(component.find(`.${anyClass}`)).toHaveLength(1);
    });
    test("should set --positive modifier", () => {
      const component = shallow(
        <BaseProfitability isNegative={!isPositive} isPositive={isPositive}>
          {content}
        </BaseProfitability>
      );
      expect(component.find(".profitability--positive")).toHaveLength(1);
    });
    test("should set --negative modifier", () => {
      const component = shallow(
        <BaseProfitability isNegative={isNegative} isPositive={!isNegative}>
          {content}
        </BaseProfitability>
      );
      expect(component.find(".profitability--negative")).toHaveLength(1);
    });
    test("should set --chips modifier", () => {
      const component = shallow(
        <BaseProfitability
          isNegative={isNegative}
          isPositive={!isNegative}
          variant={variant}
        >
          {content}
        </BaseProfitability>
      );
      expect(component.find(".profitability--chips")).toHaveLength(1);
    });
  });

  describe("Test Profitability helper function", () => {
    test("should be return signs", () => {
      expect(composeProfitabilityPrefix(PROFITABILITY_PREFIX.SIGN)).toEqual(
        signs
      );
    });
    test("should be return arrows", () => {
      expect(composeProfitabilityPrefix(PROFITABILITY_PREFIX.ARROW)).toEqual(
        arrows
      );
    });
    test("should be return without prefix", () => {
      expect(
        composeProfitabilityPrefix(PROFITABILITY_PREFIX.NO_PREFIX)
      ).toEqual(noPrefix);
    });
  });
});
