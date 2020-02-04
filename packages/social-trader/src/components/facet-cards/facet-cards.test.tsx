import { shallow } from "enzyme";
import { AssetFacet } from "gv-api-web";
import * as React from "react";

import FacetCard from "./facet-card";
import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";
import {
  _FacetCardsContainer as FacetCardsContainer,
  ASSETS_FACETS
} from "./faset-cards-container";

type Facet = AssetFacet;

describe("Facet Cards tests", () => {
  const facet: Facet = {
    sorting: "ByProfitAsc",
    description: "",
    id: "",
    logo: "",
    sortType: "New",
    timeframe: "AllTime",
    title: "",
    url: ""
  };
  const title = "title";
  const mockFunc = jest.fn();
  describe("FacetCard tests", () => {
    test("should render FacetCard", () => {
      const component = shallow(
        <FacetCard title={title} facet={facet} composeFacetUrl={mockFunc} />
      );
      expect(component.find(".facet")).toHaveLength(1);
    });
    test("should set --hovered on mouseEnter", () => {
      const component = shallow(
        <FacetCard title={title} facet={facet} composeFacetUrl={mockFunc} />
      );
      component.simulate("mouseEnter");
      expect(component.find(".facet--hovered")).toHaveLength(1);
    });
  });
  describe("FacetCards tests", () => {
    const facets: Facet[] = [facet];
    test("should render FacetCard", () => {
      const component = shallow(
        <FacetCards title={title} facets={facets} composeFacetUrl={mockFunc} />
      );
      expect(component.find(".facets")).toHaveLength(1);
    });
  });
  describe("FacetCardsContainer tests", () => {
    test("should render FacetCards if facets is not empty", () => {
      const facets: Facet[] = [facet];
      const component = shallow(
        <FacetCardsContainer
          assetsFacets={ASSETS_FACETS.FUNDS}
          title={title}
          facets={facets}
          composeFacetUrl={mockFunc}
          isPending={false}
        />
      );
      expect(component.find(FacetCards)).toHaveLength(1);
    });
    test("should render FacetCardsStub if facets is empty", () => {
      const facets: Facet[] = [];
      const component = shallow(
        <FacetCardsContainer
          assetsFacets={ASSETS_FACETS.FUNDS}
          title={title}
          facets={facets}
          composeFacetUrl={mockFunc}
          isPending={false}
        />
      );
      expect(component.find(FacetCardsStub)).toHaveLength(1);
    });
    test("should render FacetCardsStub if isPending", () => {
      const facets: Facet[] = [facet];
      const component = shallow(
        <FacetCardsContainer
          assetsFacets={ASSETS_FACETS.FUNDS}
          title={title}
          facets={facets}
          composeFacetUrl={mockFunc}
          isPending={true}
        />
      );
      expect(component.find(FacetCardsStub)).toHaveLength(1);
    });
  });
});
