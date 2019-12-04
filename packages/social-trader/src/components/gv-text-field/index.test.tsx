import { mount, shallow } from "enzyme";
import React from "react";
import NumberFormat from "react-number-format";

import GVTextArea from "./gv-text-area";
import GVTextField from "./index";

describe("GVTextField tests", () => {
  test("should render text field", () => {
    const textField = mount(<GVTextField name="textInput" />);
    expect(textField.find(GVTextField)).toHaveLength(1);
  });

  test("should have type prop", () => {
    const textField = shallow(<GVTextField name="textInput" type="password" />);
    expect(textField.find("input").prop("type")).toBe("password");
  });

  test("should have label", () => {
    const textField = shallow(<GVTextField name="textInput" label="label" />);
    expect(textField.find("label")).toHaveLength(1);
  });

  test("should render error", () => {
    const errorClass = "gv-text-field__error";
    const textField = shallow(
      <GVTextField name="textInput" touched={true} error="error" />
    );
    expect(textField.find(`.${errorClass}`)).toHaveLength(1);
  });

  test("should render adornment", () => {
    const adornmentClass = "gv-text-field__adornment";
    const textField = shallow(
      <GVTextField name="textInput" adornment="adornment" />
    );
    expect(textField.find(`.${adornmentClass}`)).toHaveLength(1);
  });

  test("should render adornment at start", () => {
    const adornmentClass = "gv-text-field__adornment--start";
    const textField = shallow(
      <GVTextField
        name="textInput"
        adornment="adornment"
        adornmentPosition="start"
      />
    );
    expect(textField.find(`.${adornmentClass}`)).toHaveLength(1);
  });

  test("should call change event", () => {
    const handleChange = jest.fn();
    const textField = shallow(
      <GVTextField name="textInput" onChange={handleChange} />
    );
    textField.find("input").simulate("change", "7");
    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][0]).toBe("7");
  });

  test("should render Custom Input Component", () => {
    const textField = shallow(
      <GVTextField name="textInput" InputComponent={NumberFormat} />
    );
    expect(textField.find(NumberFormat)).toHaveLength(1);
  });

  test("should render Text Area", () => {
    const textField = shallow(<GVTextField type="textarea" name="textInput" />);
    expect(textField.find(GVTextArea)).toHaveLength(1);
  });
});
