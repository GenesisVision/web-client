import { PAYMENT_INFO } from "actions/payment-info-actions";

import apiReducerFactory from "../shared/reducers/api-reducer/api-reducer";

const paymentInfoReducer = apiReducerFactory({
  apiType: PAYMENT_INFO
});

export default paymentInfoReducer;
