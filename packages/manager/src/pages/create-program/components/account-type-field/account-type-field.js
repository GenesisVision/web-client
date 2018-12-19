import { Field } from "formik";
import { GVTextField } from "gv-react-components";
import React, { Component } from "react";
import Select from "shared/components/select/select";

import { getLeverages } from "../../helpers/create-program.helpers";

class AccountTypeField extends Component {
  onChange = (name, target) => {
    const { setLeverageChooseAvailable, setFieldValue, broker } = this.props;

    const leverages = getLeverages(broker, target.props.value);
    if (leverages.length < 2) {
      setFieldValue("leverage", leverages[0].toString());
      setLeverageChooseAvailable(false);
    } else {
      setLeverageChooseAvailable(true);
    }

    setFieldValue("accountType", target.props.value);
  };

  render() {
    const { accountTypes, label } = this.props;
    const { onChange } = this;

    return (
      <Field
        name="accountType"
        render={({ field, form }) => {
          return (
            <GVTextField
              {...field}
              InputComponent={Select}
              touched={form.touched[field.name]}
              error={form.errors[field.name]}
              label={label}
              onChange={onChange}
            >
              {accountTypes.map(accountType => {
                return (
                  <option value={accountType} key={accountType}>
                    {accountType}
                  </option>
                );
              })}
            </GVTextField>
          );
        }}
      />
    );
  }
}

export default AccountTypeField;
