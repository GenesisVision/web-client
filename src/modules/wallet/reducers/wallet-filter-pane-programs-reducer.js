import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET_FILER_PANE_PROGRAMS } from "../actions/wallet-actions.constants";

const walletFilterPaneProgramsReducer = apiReducerFactory({
  apiType: WALLET_FILER_PANE_PROGRAMS
});

export default walletFilterPaneProgramsReducer;
