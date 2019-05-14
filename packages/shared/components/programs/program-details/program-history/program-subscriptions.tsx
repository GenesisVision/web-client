import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { TableCell, TableRow } from "shared/components/table/components";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import { PROGRAM_SUBSCRIBERS_COLUMNS } from "../program-details.constants";

class _ProgramSubscriptions extends React.Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <TableModule
        getItems={() =>
          new Promise(resolve => {
            resolve({
              items: [{}, {}, {}],
              total: 3
            });
          })
        }
        paging={DEFAULT_PAGING}
        columns={PROGRAM_SUBSCRIBERS_COLUMNS}
        renderHeader={column => (
          <span
            className={`details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`program-details-page.history.subscriptions.${column.name}`)}
          </span>
        )}
        renderBodyRow={
          (/*subscription: any*/) => {
            return (
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100%</TableCell>
                <TableCell>1035</TableCell>
                <TableCell>{moment().format()}</TableCell>
                <TableCell>{moment().format()}</TableCell>
                <TableCell>Done</TableCell>
              </TableRow>
            );
          }
        }
      />
    );
  }
}

const ProgramSubscriptions = compose<React.FC<OwnProps>>(translate())(
  _ProgramSubscriptions
);

export default ProgramSubscriptions;

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {}
