import { TFunction } from "i18next";
import { AnyObjectType } from "utils/types";

export interface Rule {
  value: number | string | RegExp;
  message: string;
}

// eslint-disable-next-line no-control-regex
export const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

export const generateRules = ({
  min,
  minLength,
  lessThan,
  max,
  maxLength,
  moreThan,
  pattern,
  required
}: {
  min?: Rule;
  minLength?: Rule;
  lessThan?: Rule;
  max?: Rule;
  maxLength?: Rule;
  moreThan?: Rule;
  pattern?: Rule;
  required?: string;
}) => {
  return {
    validate: (value: any) => {
      if (required && !value) return required;
      if (min !== undefined && value < min.value) return min.message;
      if (moreThan !== undefined && value <= moreThan.value)
        return moreThan.message;
      if (
        minLength !== undefined &&
        value &&
        value.trim().length < minLength.value
      )
        return minLength.message;
      if (lessThan !== undefined && value >= lessThan.value)
        return lessThan.message;
      if (max !== undefined && value > max.value) return max.message;
      if (
        maxLength !== undefined &&
        value &&
        value.trim().length > maxLength.value
      )
        return maxLength.message;
      if (
        pattern !== undefined &&
        !((pattern.value as unknown) as RegExp).test(value)
      )
        return pattern.message;
      return true;
    }
  };
};

export const lessThan = (limit: number, message?: string) => (
  value: number
) => {
  if (!value || value >= limit) return message || false;
  return true;
};

export const minMaxNumberRules = ({
  t,
  min = 0,
  max
}: {
  t: TFunction;
  min?: number;
  max: number;
}) => {
  return generateRules({
    required: t("validations.required"),
    min: {
      message: t("validations.min", {
        min
      }),
      value: min
    },
    max: {
      message: t("validations.max", {
        max
      }),
      value: max
    }
  });
};

export const noRequiredMinMaxNumberRules = ({
  t,
  min = 0,
  max
}: {
  t: TFunction;
  min?: number;
  max: number;
}) => {
  return generateRules({
    min: {
      message: t("validations.min", {
        min
      }),
      value: min
    },
    max: {
      message: t("validations.max", {
        max
      }),
      value: max
    }
  });
};

export const emailRules = {
  required: "Email is required.",
  pattern: {
    value: emailRegex,
    message: "Invalid email address."
  }
};

export const passwordRules = (t: TFunction) => ({
  required: t("auth:password-restore.validators.password-required"),
  minLength: {
    value: 6,
    message: t("auth:password-restore.validators.password-is-short", {
      count: 6
    })
  }
});

export const tronBlockchainWalletRules = (t: TFunction) =>
  generateRules({
    required: t("validations.address-is-required"),
    pattern: {
      value: /T[A-Za-z1-9]{33}/,
      message: "Invalid wallet address"
    }
  });

export const ethGvtWalletRules = (t: TFunction) =>
  generateRules({
    required: t("validations.address-is-required"),
    pattern: {
      value: /^0x[a-fA-F0-9]{40}$/,
      message: "Invalid wallet address"
    }
  });

export const btcGvtWalletRules = (t: TFunction) =>
  generateRules({
    required: t("validations.address-is-required"),
    pattern: {
      value: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      message: "Invalid wallet address"
    }
  });

export const assetTitleRules = (t: TFunction) => ({
  required: t("validations.title-required"),
  minLength: {
    value: 4,
    message: t("validations.title-is-short")
  },
  maxLength: {
    value: 20,
    message: t("validations.title-is-long")
  },
  pattern: {
    value: /^[-a-zA-Z0-9\s]{4,20}$/,
    message: t("validations.title-is-latin-and-numbers")
  }
});

export const assetDescriptionRules = (t: TFunction) =>
  generateRules({
    required: t("validations.description-required"),
    minLength: {
      value: 20,
      message: t("validations.description-is-short")
    },
    maxLength: {
      value: 500,
      message: t("validations.description-is-long")
    }
  });

export const signalSuccessFeeRules = (
  t: TFunction,
  min: number,
  max: number
) => ({
  required: t("validations.success-fee-required"),
  min: {
    value: min,
    message: t("validations.success-fee-min")
  },
  max: {
    value: max,
    message: t("validations.success-fee-max", {
      max
    })
  }
});

export const signalVolumeFeeRules = (
  t: TFunction,
  min: number = 0,
  max: number = 0.1
) => ({
  required: t("validations.signal-volume-fee-required"),
  min: {
    value: min,
    message: t("validations.signal-volume-fee-min", {
      min
    })
  },
  max: {
    value: max,
    message: t("validations.signal-volume-fee-max", {
      max
    })
  }
});

export const entryFeeRules = (t: TFunction, max: number) => ({
  required: t("validations.entry-fee-required"),
  min: {
    value: 0,
    message: t("validations.entry-fee-min")
  },
  max: {
    value: max,
    message: t("validations.entry-fee-max", {
      max
    })
  }
});

export const successFeeRules = (t: TFunction, max: number) => ({
  required: t("validations.success-fee-required"),
  min: {
    value: 0,
    message: t("validations.success-fee-min")
  },
  max: {
    value: max,
    message: t("validations.success-fee-max", {
      max
    })
  }
});

export const exitFeeRules = (t: TFunction, max: number) => ({
  required: t("validations.exit-fee-required"),
  min: {
    value: 0,
    message: t("validations.exit-fee-min")
  },
  max: {
    value: max,
    message: t("validations.exit-fee-max", {
      max
    })
  }
});

export const twoFactorRules = (t: TFunction) => ({
  pattern: {
    value: /^\d{6}$/,
    message: t("validations.two-factor-6digits")
  },
  required: t("profile-page:2fa-page.code-required")
});

export const depositAmountRules = ({
  getValues,
  t
}: {
  getValues: () => any;
  t: TFunction;
}) => {
  return {
    validate: (value: number) => {
      const { minValue, minText, max } = getValues();
      if (value === undefined) return t("validations.amount-required");
      if (value > max) return t("validations.amount-is-large");
      if (value < minValue)
        return t("validations.amount-is-zero", {
          min: minText || minValue
        });
    }
  };
};

export const getConfirmPasswordValidationRules = ({
  t,
  watch
}: {
  t: TFunction;
  watch: () => AnyObjectType;
}) => {
  return {
    required: t("auth:password-restore.validators.confirm-password-required"),
    validate: (value: string) => {
      const { password } = watch();
      return value !== password
        ? t("auth:password-restore.validators.password-dont-match")
        : true;
    }
  };
};
