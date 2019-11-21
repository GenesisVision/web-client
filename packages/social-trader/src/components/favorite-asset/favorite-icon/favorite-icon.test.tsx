import { Icon } from "components/icon/icon";
import { mount, shallow } from "enzyme";
import * as React from "react";

import FavoriteIcon from "./favorite-icon";
import { ReactComponent as Favorite } from "./favorite.svg";

describe("Favorite Icon tests", () => {
  const id = "id";
  test("should render FavoriteIcon", () => {
    const component = shallow(<FavoriteIcon id={id} selected />);
    expect(component.find(Favorite)).toHaveLength(1);
    expect(component.find(Icon)).toHaveLength(1);
  });
  test("should set className", () => {
    const className = "className";
    const component = shallow(
      <FavoriteIcon id={id} selected className={className} />
    );
    expect(component.find(`.${className}`)).toHaveLength(1);
  });
  test("should set selected", () => {
    const component = mount(<FavoriteIcon id={id} selected />);
    expect(component.find(".icon--selected")).toHaveLength(1);
  });
  test("shouldn't set selected", () => {
    const component = mount(<FavoriteIcon id={id} selected={false} />);
    expect(component.find(".icon--selected")).toHaveLength(0);
  });
  test("should call click event", () => {
    const handleClick = jest.fn();
    const component = shallow(
      <FavoriteIcon id={id} selected onClick={handleClick} />
    );
    component.simulate("click", {
      stopPropagation: () => {}
    });
    expect(handleClick).toBeCalled();
  });
});
