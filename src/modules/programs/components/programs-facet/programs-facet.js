import React from "react";
import { Link } from "react-router-dom";

const ProgramsFacet = ({ goBack }) => {
  const handleClick = e => {
    e.preventDefault();
    goBack();
  };
  return (
    <div>
      <Link to="" onClick={handleClick}>
        back
      </Link>
      <br />
      <br />
      <div>FacetName</div>
      <div>FacetPrograms</div>
    </div>
  );
};

export default ProgramsFacet;
