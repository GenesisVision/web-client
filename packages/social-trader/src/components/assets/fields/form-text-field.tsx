import clsx from "clsx";
import { Text } from "components/text/text";
import * as React from "react";

import styles from "./form-text-field.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

const _FormTextField: React.FC<Props> = ({ children, accent }) => {
  return (
    <div
      className={clsx(styles["form-text-field__text"], {
        [styles["form-text-field__text--color-accent"]]: accent
      })}
    >
      <Text muted>{children}</Text>
    </div>
  );
};

const FormTextField = React.memo(_FormTextField);
export default FormTextField;
