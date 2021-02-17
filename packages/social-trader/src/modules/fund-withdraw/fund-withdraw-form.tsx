import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogInfo } from "components/dialog/dialog-info";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import useApiRequest from "hooks/api-request.hook";
import {
    FUND_WITHDRAW_FIELDS,
    FundWithDrawFormValues
} from "modules/fund-withdraw/fund-withdraw.types";
import {
    fundWithdrawFormValidationSchema,
    MIN_FUND_WITHDRAW_VALUE
} from "modules/fund-withdraw/fund-withdraw-form-validation-schema";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { useSelector } from "react-redux";
import { fundMinWithdrawAmountSelector } from "reducers/platform-reducer";
import { formatValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm, postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import { FundWithdrawResult } from "./fund-withdraw-result";
import { withdrawFund } from "./services/fund-withdraw.services";

interface Props {
    errorMessage?: string;
    infoMessage?: string;
    isPending: boolean;
    currency: CurrencyEnum;
    setCurrency: (id: CurrencyEnum) => void;
    initWalletId: string;
    exitFee: number;
    availableToWithdraw: number;
    onApply?: VoidFunction;
    onClose: (param?: any) => void;
    id: string;
}

const getMinPercent = (value: number, total: number) =>
    Math.max((value / total) * 100, MIN_FUND_WITHDRAW_VALUE);

const _FundWithdrawForm: React.FC<Props> = ({
    onApply = () => { },
    errorMessage: errorFromProps,
    id,
    onClose,
    initWalletId,
    infoMessage,
    isPending,
    currency,
    setCurrency,
    availableToWithdraw,
    exitFee
}) => {
    const [t] = useTranslation();

    const [minPercent, setMinPercent] = useState(0);
    const fundMinWithdrawAmount = useSelector(fundMinWithdrawAmountSelector);
    const fundMinWithdrawAmountInCur = safeGetElemFromArray(
        fundMinWithdrawAmount,
        amount => amount.currency === currency
    ).amount;

    const form = useForm<FundWithDrawFormValues>({
        defaultValues: {
            [FUND_WITHDRAW_FIELDS.walletId]: initWalletId,
            [FUND_WITHDRAW_FIELDS.percent]: minPercent
        },
        validationSchema: fundWithdrawFormValidationSchema(t, minPercent),
        mode: "onChange"
    });
    const { watch, setValue } = form;
    const { percent } = watch();

    const onCloseMiddleware = postponeCallback(onClose);
    const { errorMessage, sendRequest } = useApiRequest({
        middleware: [onCloseMiddleware, onApply],
        request: withdrawFund,
        successMessage: "withdraw-fund.success-alert-message"
    });

    const handleSubmit = useCallback(
        () =>
            sendRequest({
                id,
                value: {
                    percent,
                    currency
                }
            }),
        [percent, currency, id]
    );

    useEffect(() => {
        const min = +formatValue(
            getMinPercent(
                Math.min(fundMinWithdrawAmountInCur, availableToWithdraw),
                availableToWithdraw
            ),
            2,
            false,
            { up: true }
        );
        setMinPercent(min);
    }, [availableToWithdraw, fundMinWithdrawAmountInCur]);

    useEffect(() => {
        setValue(FUND_WITHDRAW_FIELDS.percent, minPercent, true);
    }, [minPercent]);

    const isAllow = useCallback(
        (values: NumberFormatValues) =>
            !values.floatValue ||
            (values.floatValue >= MIN_FUND_WITHDRAW_VALUE &&
                values.floatValue <= 100 &&
                values.value !== "."),
        []
    );

    const setMax = useCallback(
        () => setValue(FUND_WITHDRAW_FIELDS.percent, 100, true),
        [setValue]
    );

    const setMin = useCallback(
        () => setValue(FUND_WITHDRAW_FIELDS.percent, minPercent, true),
        [setValue, minPercent]
    );

    const changeWalletCallback = useCallback(
        ({ id, currency }: WalletItemType) => {
            setValue(FUND_WITHDRAW_FIELDS.walletId, id, true);
            setCurrency(currency);
        },
        [setValue, setCurrency]
    );

    return (
        <HookForm form={form} onSubmit={handleSubmit}>
            <Row>
                <WalletSelectContainer
                    label={t("labels.to")}
                    name={FUND_WITHDRAW_FIELDS.walletId}
                    onChange={changeWalletCallback}
                />
            </Row>
            <Row size={"large"} hide={minPercent === 100}>
                <InputAmountField
                    name={FUND_WITHDRAW_FIELDS.percent}
                    label={t("withdraw-fund.amount-to-withdraw")}
                    placeholder="%"
                    currency="%"
                    isAllowed={isAllow}
                    setMax={setMax}
                    setMin={setMin}
                />
            </Row>
            {minPercent === 100 && (
                <Row>
                    <LabeledValue label={t("withdraw-fund.amount-to-withdraw")}>
                        {percent} %
          </LabeledValue>
                </Row>
            )}
            <FundWithdrawResult
                isPending={isPending}
                availableToWithdraw={availableToWithdraw}
                currency={currency}
                percent={percent || 0}
                exitFee={exitFee}
            />
            <DialogError error={errorMessage} />
            <DialogButtons>
                <SubmitButton wide checkDirty={false} isSuccessful={!errorMessage}>
                    {t("buttons.confirm")}
                </SubmitButton>
            </DialogButtons>
            {infoMessage && <DialogInfo>{infoMessage}</DialogInfo>}
            {errorFromProps && <DialogError error={errorFromProps} />}
        </HookForm>
    );
};

const FundWithdrawForm = React.memo(_FundWithdrawForm);
export default FundWithdrawForm;
