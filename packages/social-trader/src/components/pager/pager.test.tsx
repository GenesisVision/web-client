import { shallow } from "enzyme";
import * as React from "react";

import Pager, { PagerSeparator } from "./pager";
import PagerButton, { _PagerButton as TestedPagerButton } from "./pager-button";

describe("Paging tests", () => {
  describe("Pager tests", () => {
    test("should render pager", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <Pager total={6} current={1} onPageChanged={handleClick} />
      );
      expect(component.find(".pager")).toHaveLength(1);
      component.unmount();
    });
    test("should render 1+3+1 PagerButtons if count >6 and current in middle", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <Pager total={7} current={4} onPageChanged={handleClick} />
      );
      expect(component.find(PagerButton)).toHaveLength(5);
      component.unmount();
    });
    test("should render 1+3 PagerButtons if count >6 and current in start or end", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <Pager total={7} current={1} onPageChanged={handleClick} />
      );
      expect(component.find(PagerButton)).toHaveLength(4);
      component.unmount();
      const pager2 = shallow(
        <Pager total={7} current={7} onPageChanged={handleClick} />
      );
      expect(pager2.find(PagerButton)).toHaveLength(4);
      pager2.unmount();
    });
    test("should for total count < 5 render PagerButtons===total", () => {
      let total = 1;
      const handleClick = jest.fn();
      for (; total < 5; total++) {
        const component = shallow(
          <Pager total={total} current={1} onPageChanged={handleClick} />
        );
        expect(component.find(PagerButton)).toHaveLength(total);
        component.unmount();
      }
    });
    test("should for total count >= 5 render PagerSeparator", () => {
      let total = 5;
      const handleClick = jest.fn();
      for (; total < 10; total++) {
        const component = shallow(
          <Pager total={total} current={1} onPageChanged={handleClick} />
        );
        expect(component.find(PagerSeparator)).toHaveLength(1);
        component.unmount();
      }
    });
  });
  describe("PagerButton tests", () => {
    test("should render PagerButton", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <TestedPagerButton
          page={1}
          label={"1"}
          current={3}
          clickHandle={handleClick}
        />
      );
      expect(component.find(".pager__button")).toHaveLength(1);
      component.unmount();
    });
    test("should set --current modificator", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <TestedPagerButton
          page={1}
          label={"1"}
          current={1}
          clickHandle={handleClick}
        />
      );
      expect(component.find(".pager__button--current")).toHaveLength(1);
      component.unmount();
    });
    test("should call click event", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <TestedPagerButton
          page={1}
          label={"1"}
          current={1}
          clickHandle={handleClick}
        />
      );
      component.simulate("click");
      expect(handleClick).toBeCalled();
      component.unmount();
    });
  });
});
