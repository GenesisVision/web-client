import platformApi from "services/api-client/platform-api";

export const PAYMENT_INFO = "PAYMENT_INFO";

const fetchPaymentInfo = () => ({
  type: PAYMENT_INFO,
  payload: platformApi.v10PlatformPaymentInfoGet()
});

export default fetchPaymentInfo;
