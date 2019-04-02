export const LOGIN = "LOGIN";
export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";
export const TWO_FACTOR_CODE = "twoFactorCode";
export const RECOVERY_CODE = "recoveryCode";

export const storeTwoFactor = ({
  email,
  password,
  from
}: {
  email: string;
  password: string;
  from: string;
}) => ({
  type: LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});
