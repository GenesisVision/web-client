import React, { FormEventHandler } from "react";
import { FormContext } from "react-hook-form";
import { FormContextValues } from "react-hook-form/dist/contextTypes";

export const HookForm: React.FC<{
  form: FormContextValues<any>;
  onSubmit?: FormEventHandler<any>;
  className?: string;
}> = ({ form, onSubmit, children, className }) => {
  return (
    <FormContext {...form}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormContext>
  );
};
