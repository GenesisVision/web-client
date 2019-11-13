import "./asset-field.scss";

import classNames from "classnames";
import * as React from "react";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { TextInputValues } from "shared/components/text-input-component/text-input-component";

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
            <span>
              {trimmedLength}
              <GVProgramPeriod
                start={0}
                end={500}
                value={trimmedLength}
                variant="pie"
              />
            </span>
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
