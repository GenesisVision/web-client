import * as React from "react";
import { shallow } from "enzyme";
import FacetCard from "./facet-card";
import { Facet } from "gv-api-web";

describe("Facet Cards tests", () => {
  describe("FacetCard tests", () => {
    const title = "title";
    const facet: Facet = {
      description: "",
      id: "",
      logo: "",
      sortType: "New",
      timeframe: "AllTime",
      title: "",
      url: ""
    };
    test("should render FacetCard", () => {
      const handleClick = jest.fn();
      const component = shallow(
        <FacetCard title={title} facet={facet} composeFacetUrl={handleClick} />
      );
      expect(component.find(".facet")).toHaveLength(1);
    });
  });
});
