export enum FUND_PUBLIC_FORM_FIELDS {
  title = "title",
  description = "description",
  entryFee = "entryFee",
  exitFee = "exitFee"
}

export interface IFundPublicFormValues {
  [FUND_PUBLIC_FORM_FIELDS.title]: string;
  [FUND_PUBLIC_FORM_FIELDS.description]: string;
  [FUND_PUBLIC_FORM_FIELDS.entryFee]: number;
  [FUND_PUBLIC_FORM_FIELDS.exitFee]: number;
}
