import "./asset-field.scss";

import classNames from "classnames";
import GVFormikField from "components/gv-formik-field";
import GVProgramPeriod from "components/gv-program-period";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { TextInputValues } from "components/text-input-component/text-input-component";
import * as React from "react";

export const _AssetFormField: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({
  max = 500,
  value = "",
  name,
  label,
  component,
  caption,
  className,
  adornment,
  type,
  hintContent,
  hintTooltipContent
}) => {
  const trimmedLength = value.trim().length;
  return (
    <div className={classNames("asset-form-field", className)}>
      <GVFormikField
        adornment={adornment}
        type={type}
        name={name}
        label={label}
        autoComplete="off"
        component={component}
      />
      {caption && (
        <div className="asset-form-field__caption">
          <span>{caption}</span>
          {trimmedLength > 0 && (
            <div className="asset-form-field__caption-count">
              {trimmedLength}
              <GVProgramPeriod
                start={0}
                end={max}
                value={trimmedLength}
                variant="pie"
              />
            </div>
          )}
        </div>
      )}
      {hintContent && (
        <Hint
          content={hintContent}
          className="asset-form-field__hint"
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          tooltipContent={hintTooltipContent}
        />
      )}
    </div>
  );
};

interface Props {
  isAllowed?: (values: TextInputValues) => boolean;
  max?: number;
  value?: string;
  hintContent?: string;
  hintTooltipContent?: string;
  adornment?: string;
  type?: string;
  caption?: string;
  component: React.ComponentType<any>;
  label: string;
  name: string;
  className?: string;
}

const AssetFormField = React.memo(_AssetFormField);
export default AssetFormField;
