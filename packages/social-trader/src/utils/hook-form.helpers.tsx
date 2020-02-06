import React, { FormEventHandler } from "react";
import { FormContext } from "react-hook-form";
import { FormContextValues } from "react-hook-form/dist/contextTypes";

export const HookForm: React.FC<{
  form: FormContextValues<any>;
  onSubmit?: FormEventHandler<any>;
}> = ({ form, onSubmit, children }) => {
  return (
    <FormContext {...form}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormContext>
  );
};
