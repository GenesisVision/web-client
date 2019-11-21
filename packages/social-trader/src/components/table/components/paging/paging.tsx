import "./paging.scss";

import Pager from "components/pager/pager";
import { IPaging } from "components/table/helpers/paging.helpers";
import withLoader from "decorators/with-loader";
import * as React from "react";

interface IPagingProps {
  paging: IPaging;
  hidden?: boolean;
  updatePaging(opts: { currentPage: number }): void;
}

const _Paging: React.FC<IPagingProps> = ({ paging, hidden, updatePaging }) => (
  <Pager
    total={paging.totalPages || 0}
    current={paging.currentPage || 1}
    countVisiblePages={3}
    onPageChanged={(nextPage: number) =>
      updatePaging({ currentPage: nextPage - 1 })
    }
  />
);

const Paging = withLoader(React.memo(_Paging));
export default Paging;
