import React, { FormEventHandler } from "react";
import { FormContext } from "react-hook-form";
import { FormContextValues } from "react-hook-form/dist/contextTypes";

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
