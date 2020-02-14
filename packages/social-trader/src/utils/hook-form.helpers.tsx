import { SHOW_SUCCESS_TIME } from "constants/constants";
import React from "react";
import { FormContext } from "react-hook-form";
import { FormContextValues } from "react-hook-form/dist/contextTypes";
import { MiddlewareType } from "utils/promise-middleware";

export const HookForm: React.FC<{
  form: FormContextValues<any>;
  onSubmit: (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => void | Promise<void>;
  className?: string;
}> = ({ form, onSubmit, children, className }) => {
  return (
    <FormContext {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormContext>
  );
};
export const getPostponedOnCallback = (callback?: Function): MiddlewareType => {
  return () => {
    setTimeout(() => {
      callback && callback();
    }, SHOW_SUCCESS_TIME);
  };
};
