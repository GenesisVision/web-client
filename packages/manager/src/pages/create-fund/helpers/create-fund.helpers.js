import { getNumberWithoutSuffix } from "shared/utils/helpers";

export const getDataWithoutSuffixes = (data, fields) => {
  let result = { ...data };

  fields.forEach(fieldName => {
    let field = result[fieldName];

    if (field) {
      field = getNumberWithoutSuffix(field);

      result[fieldName] = field;
    }
  });

  return result;
};
