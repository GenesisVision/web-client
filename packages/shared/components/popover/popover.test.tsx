import { shallow } from "enzyme";
import * as React from "react";

import { _Popover as Popover } from "./popover";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

describe("Popover tests", () => {
  test("should render popover", () => {
    const popover = shallow(<Popover scrollTop={0} anchorEl={() => {}} />);
    expect(popover.find(".popover")).toHaveLength(1);
  });
});
