import "./kyc.scss";

import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

import { loadKycIFrame } from "../settings/services/kyc.service";

const KYCContainer: React.FC = () => {
  const id = useSelector(idSelector);
  useEffect(() => {
    loadKycIFrame(id);
  }, [id]);
  return <div id="idensic" className="idensic" />;
};

export default KYCContainer;
