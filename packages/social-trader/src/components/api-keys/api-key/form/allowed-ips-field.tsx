import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { GVHookFormField } from "components/gv-hook-form-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import TileFilterItem from "components/table/components/filtering/tile-filter-item";
import TagBubble from "components/tags/tag-item/tag-bubble";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { HookForm } from "utils/hook-form.helpers";
import { $yellow } from "utils/style/colors";

interface Props {
  name: string;
  value: string[];
  setValue: (name: string, value: any, trigger?: boolean) => any;
}

const _AllowedIpsField: React.FC<Props> = ({ name, value = [], setValue }) => {
  const form = useForm<{ IP: string }>({
    mode: "onChange"
  });

  const {
    reset,
    handleSubmit,
    formState: { isValid }
  } = form;

  const handleAdd = useCallback(
    ({ IP }: { IP: string }) => {
      if (!value.includes(IP)) setValue(name, [...value, IP], true);
    },
    [value, setValue, name]
  );

  const handleRemove = useCallback(
    (id: string) => {
      setValue(
        name,
        value.filter(ip => ip !== id),
        true
      );
    },
    [value, setValue, name]
  );

  const onSubmit = useCallback(() => {
    handleSubmit(handleAdd)().then(() => reset());
  }, [handleSubmit, handleAdd, reset]);

  return (
    <div>
      {!!value.length && (
        <Row wrap>
          {value.map(ip => (
            <RowItem key={ip}>
              <TileFilterItem id={ip} removeTile={handleRemove}>
                <TagBubble color={$yellow}>{ip}</TagBubble>
              </TileFilterItem>
            </RowItem>
          ))}
        </Row>
      )}
      <Row hide>
        <GVHookFormField component={SimpleTextField} name={name} />
      </Row>
      <Row size={"xsmall"}>
        <HookForm resetOnSuccess form={form} onSubmit={handleAdd}>
          <Center>
            <RowItem>
              <GVHookFormField
                showCorrect
                name={"IP"}
                label={"IP"}
                component={SimpleTextField}
                rules={{
                  required: "required",
                  pattern: {
                    value: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    message: "Invalid IP"
                  }
                }}
              />
            </RowItem>
            <RowItem>
              <Button size={"small"} onClick={onSubmit} disabled={!isValid}>
                Add
              </Button>
            </RowItem>
          </Center>
        </HookForm>
      </Row>
    </div>
  );
};

export const AllowedIpsField = React.memo(_AllowedIpsField);
