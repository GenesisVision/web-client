import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

import { loadKycIFrame } from "../settings/services/kyc.service";
import styles from "./kyc.module.scss";

const KYCContainer: React.FC = () => {
  const id = useSelector(idSelector);
  useEffect(() => {
    loadKycIFrame(id);
  }, [id]);
  return <div id="sumsub-websdk-container" className={styles["idensic"]} />;
};

export default KYCContainer;
