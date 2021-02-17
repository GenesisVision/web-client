import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import {
    IProgramWithdrawAmountFormValues,
    programWithdrawAmountValidationSchema,
    WITHDRAW_FORM_FIELDS
} from "modules/program-withdraw/program-withdraw.helpers";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatDate } from "utils/dates";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";

import { withdrawProgramById } from "./services/program-withdraw.services";

interface Props {
    GM?: boolean;
    withdrawInPercent?: boolean;
    isProcessingRealTime?: boolean;
    availableToWithdraw: number;
    programCurrency: string;
    accountCurrency: string;
    rate: number;
    isOwner: boolean;
    onApply?: VoidFunction;
    id: string;
    onClose: (param?: any) => void;
    periodEnds: Date;
}

const _ProgramWithdrawForm: React.FC<Props> = ({
    GM,
    withdrawInPercent,
    isProcessingRealTime,
    availableToWithdraw,
    accountCurrency,
    programCurrency,
    rate,
    isOwner,
    onApply = () => { },
    id,
    onClose,
    periodEnds
}) => {
    const [t] = useTranslation();

    const form = useForm<IProgramWithdrawAmountFormValues>({
        defaultValues: {
            [WITHDRAW_FORM_FIELDS.amount]: "",
            [WITHDRAW_FORM_FIELDS.withdrawAll]: false
        },
        validationSchema: programWithdrawAmountValidationSchema({
            withdrawInPercent,
            availableToWithdraw,
            t
        }),
        mode: "onChange"
    });

    const { watch, setValue } = form;

    const { amount, withdrawAll } = watch();

    const onCloseMiddleware = postponeCallback(onClose);
    const { errorMessage, sendRequest } = useApiRequest({
        middleware: [onCloseMiddleware, onApply],
        request: withdrawProgramById,
        successMessage: "withdraw-program.success-alert-message"
    });
    const handleSubmit = useCallback(
        () => sendRequest({ id, value: { amount, withdrawAll } }),
        [amount, withdrawAll]
    );

    const isAllow = useCallback(
        ({ formattedValue, value }: NumberFormatValues) => {
            return (
                (formattedValue === "" || validateFraction(value, programCurrency)) &&
                value !== "."
            );
        },
        [programCurrency]
    );

    const time = withdrawInPercent
        ? new Date(periodEnds).toUTCString()
        : t("withdraw-program.end");

    const infoMessage = t("withdraw-program.info", {
        time
    });

    const maxAmount = +formatCurrencyValue(availableToWithdraw, programCurrency);

    const setMaxAmount = useCallback(() => {
        const formMaxAmount = withdrawInPercent ? 100 : maxAmount;
        setValue(WITHDRAW_FORM_FIELDS.amount, formMaxAmount, true);
    }, [
        maxAmount,
        withdrawInPercent,
        availableToWithdraw,
        programCurrency,
        setValue
    ]);

    const convertedValue = withdrawInPercent
        ? (maxAmount / 100) * +amount
        : amount;

    const value = withdrawInPercent
        ? amount
        : formatCurrencyValue(+amount, programCurrency);
    const suff = withdrawInPercent ? "%" : programCurrency;

    return (
        <HookForm form={form} onSubmit={handleSubmit}>
            {!isOwner && (
                <Row>
                    <GVHookFormField
                        wide
                        type="checkbox"
                        color="primary"
                        name={WITHDRAW_FORM_FIELDS.withdrawAll}
                        label={<span>{t("withdraw-program.withdraw-all")}</span>}
                        component={GVCheckbox}
                    />
                </Row>
            )}
            {withdrawAll && (
                <Row>
                    <Text muted>
                        {GM
                            ? t("withdraw-program.gm-all-text")
                            : t("withdraw-program.all-text")}
                    </Text>
                </Row>
            )}
            <Row onlyOffset hide={withdrawAll}>
                <InputAmountField
                    name={WITHDRAW_FORM_FIELDS.amount}
                    label={t("withdraw-program.amount-to-withdraw")}
                    currency={withdrawInPercent ? "%" : programCurrency}
                    isAllowed={isAllow}
                    setMax={isOwner || withdrawInPercent ? setMaxAmount : undefined}
                />
            </Row>
            {!GM && programCurrency !== accountCurrency && amount !== 0 && (
                <Row>
                    <Text muted>
                        <NumberFormat
                            value={formatCurrencyValue(
                                convertFromCurrency(convertedValue!, rate),
                                accountCurrency
                            )}
                            prefix="≈ "
                            suffix={` ${accountCurrency}`}
                            displayType="text"
                        />
                    </Text>
                </Row>
            )}
            <DialogList>
                <DialogListItem label={t("withdraw-program.withdrawing")}>
                    {!amount && !withdrawAll
                        ? "—"
                        : amount && !withdrawAll
                            ? `${value} ${suff}`
                            : t("withdraw-program.all")}
                </DialogListItem>
                <DialogListItem label={t("withdraw-program.payout-date")}>
                    {formatDate(periodEnds)}
                </DialogListItem>
            </DialogList>
            <DialogError error={errorMessage} />
            <DialogButtons>
                <SubmitButton
                    wide
                    disabled={!amount && !withdrawAll}
                    checkDirty={false}
                    isSuccessful={!errorMessage}
                >
                    {t("withdraw-program.submit")}
                </SubmitButton>
            </DialogButtons>
            {(!withdrawInPercent || !isProcessingRealTime) && (
                <DialogInfo>{infoMessage}</DialogInfo>
            )}
        </HookForm>
    );
};

const ProgramWithdrawForm = React.memo(_ProgramWithdrawForm);
export default ProgramWithdrawForm;
