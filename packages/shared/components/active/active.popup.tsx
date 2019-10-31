import "./active.scss";

import React, { useEffect } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import useApiRequest from "shared/hooks/api-request.hook";

import Active from "./active";
import { fetchActive, getActiveLoaderData } from "./service/active.service";

const _ActivePopup: React.FC<Props> = ({ open, onClose, active }) => {
  const { data, sendRequest } = useApiRequest({
    request: fetchActive
  });
  useEffect(() => {
    sendRequest({ active });
  }, []);
  return (
    <Dialog open={open} onClose={onClose} top>
      <div className="active__popup">
        <Active loaderData={getActiveLoaderData} data={data} />
      </div>
    </Dialog>
  );
};

interface Props extends IDialogProps {
  active: string;
}

const ActivePopup = React.memo(_ActivePopup);
export default ActivePopup;
