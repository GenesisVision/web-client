import "./paging.scss";

import * as React from "react";
import Pager from "shared/components/pager/pager";
import { IPaging } from "shared/components/table/helpers/paging.helpers";
import withLoader from "shared/decorators/with-loader";

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
