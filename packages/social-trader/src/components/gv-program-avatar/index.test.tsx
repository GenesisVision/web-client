import ImageBase from "components/avatar/image-base";
import { mount, shallow } from "enzyme";
import React from "react";

import GVProgramAvatar from "./index";

describe("GVProgramAvatar tests", () => {
  test("should render program avatar", () => {
    const programAvatar = mount(
      <GVProgramAvatar url="example.com/image.jpg" alt="avatar" level={1} />
    );
    expect(programAvatar.find("img")).toHaveLength(1);
  });

  test("should add url prop", () => {
    const programAvatar = shallow(
      <GVProgramAvatar url="example.com/image.jpg" alt="avatar" level={1} />
    );
    expect(programAvatar.find(ImageBase).prop("src")).toBe(
      "example.com/image.jpg"
    );
  });

  test("should add alt prop", () => {
    const programAvatar = shallow(
      <GVProgramAvatar url="example.com/image.jpg" alt="avatar" level={1} />
    );
    expect(programAvatar.find(ImageBase).prop("alt")).toBe("avatar");
  });

  test("should add level prop", () => {
    const levelClassName = "pie-container__value";
    const programAvatar = mount(
      <GVProgramAvatar url="example.com/image.jpg" alt="avatar" level={1} />
    );
    expect(programAvatar.find(`.${levelClassName}`).text()).toBe("1");
  });

  test("should call click event", () => {
    const handleClick = jest.fn();
    const programAvatar = shallow(
      <GVProgramAvatar
        url="example.com/image.jpg"
        alt="avatar"
        level={1}
        onClickLevel={handleClick}
      />
    );
    programAvatar.find(`.program-avatar__level`).simulate("click");
    expect(handleClick).toBeCalled();
  });

  test("should call enter event", () => {
    const handleEnter = jest.fn();
    const programAvatar = shallow(
      <GVProgramAvatar
        url="example.com/image.jpg"
        alt="avatar"
        level={1}
        onMouseEnterLevel={handleEnter}
      />
    );
    programAvatar.find(`.program-avatar__level`).simulate("mouseEnter");
    expect(handleEnter).toBeCalled();
  });

  test("should call over event", () => {
    const handleOver = jest.fn();
    const programAvatar = shallow(
      <GVProgramAvatar
        url="example.com/image.jpg"
        alt="avatar"
        level={1}
        onMouseOverLevel={handleOver}
      />
    );
    programAvatar.find(`.program-avatar__level`).simulate("mouseOver");
    expect(handleOver).toBeCalled();
  });

  test("should call leave event", () => {
    const handleLeave = jest.fn();
    const programAvatar = shallow(
      <GVProgramAvatar
        url="example.com/image.jpg"
        alt="avatar"
        level={1}
        onMouseLeaveLevel={handleLeave}
      />
    );
    programAvatar.find(`.program-avatar__level`).simulate("mouseLeave");
    expect(handleLeave).toBeCalled();
  });
});
