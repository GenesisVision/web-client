import { Field } from "formik";
import React from "react";

interface GVFormikFieldProps {
  component: any;
  name: string;
  [key: string]: any;
}

const GVFormikField: React.FC<GVFormikFieldProps> = ({
  component: Component,
  name,
  ...props
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }: any) => {
        return (
          <Component
            {...field}
            {...props}
            form={form}
            touched={form.touched[field.name]}
            error={form.errors[field.name]}
          />
        );
      }}
    />
  );
};

export default GVFormikField;
