import "./active.scss";

import Dialog, { IDialogProps } from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";

import Active from "./active";
import { fetchActive, getActiveLoaderData } from "./service/active.service";

const _ActivePopup: React.FC<Props> = ({ open, onClose, active }) => {
  const { data } = useApiRequest({
    request: () => fetchActive({ active }),
    fetchOnMount: true
  });
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
