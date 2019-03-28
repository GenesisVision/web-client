import * as React from "react";
import { shallow, mount } from "enzyme";
import {
  _Pager as Pager,
  _PagerButton as TestedPagerButton,
  PagerButton,
  PagerSeparator
} from "./pager";
import Modal from "../modal/modal";
import EventListener from "react-event-listener";

describe("Paging tests", () => {
  describe("Pager tests", () => {
    test("should render pager", () => {
      const handleClick = jest.fn();
      const pager = shallow(
        <Pager total={6} current={1} onPageChanged={handleClick} />
      );
      expect(pager.find(".pager")).toHaveLength(1);
      pager.unmount();
    });
    test("should render 1+3+1 PagerButtons if count >6 and current in middle", () => {
      const handleClick = jest.fn();
      const pager = shallow(
        <Pager total={7} current={4} onPageChanged={handleClick} />
      );
      expect(pager.find(PagerButton)).toHaveLength(5);
      pager.unmount();
    });
    /*test("should set --current modificator to current PagerButton", () => {
      const handleClick = jest.fn();
      const pager = shallow(
        <Pager total={7} current={0} onPageChanged={handleClick} />
      );
      expect(
        pager
          .find(PagerButton)
          .first()
          .find(".pager__button--current")
      ).toHaveLength(1);
      pager.unmount();
    });*/
    test("should render 1+3 PagerButtons if count >6 and current in start or end", () => {
      const handleClick = jest.fn();
      const pager = shallow(
        <Pager total={7} current={1} onPageChanged={handleClick} />
      );
      expect(pager.find(PagerButton)).toHaveLength(4);
      pager.unmount();
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
        const pager = shallow(
          <Pager total={total} current={1} onPageChanged={handleClick} />
        );
        expect(pager.find(PagerButton)).toHaveLength(total);
        pager.unmount();
      }
    });
    test("should for total count >= 5 render PagerSeparator", () => {
      let total = 5;
      const handleClick = jest.fn();
      for (; total < 10; total++) {
        const pager = shallow(
          <Pager total={total} current={1} onPageChanged={handleClick} />
        );
        expect(pager.find(PagerSeparator)).toHaveLength(1);
        pager.unmount();
      }
    });
  });
  describe("PagerButton tests", () => {
    test("should render PagerButton", () => {
      const handleClick = jest.fn();
      const pagerButton = shallow(
        <TestedPagerButton
          page={1}
          label={"1"}
          current={3}
          clickHandle={handleClick}
        />
      );
      expect(pagerButton.find(".pager__button")).toHaveLength(1);
      pagerButton.unmount();
    });
    test("should set --current modificator", () => {
      const handleClick = jest.fn();
      const pagerButton = shallow(
        <TestedPagerButton
          page={1}
          label={"1"}
          current={1}
          clickHandle={handleClick}
        />
      );
      expect(pagerButton.find(".pager__button--current")).toHaveLength(1);
      pagerButton.unmount();
    });
    test("should call click event", () => {
      const handleClick = jest.fn();
      const pagerButton = shallow(
        <TestedPagerButton
          page={1}
          label={"1"}
          current={1}
          clickHandle={handleClick}
        />
      );
      pagerButton.simulate("click");
      expect(handleClick).toBeCalled();
      pagerButton.unmount();
    });
  });
});
