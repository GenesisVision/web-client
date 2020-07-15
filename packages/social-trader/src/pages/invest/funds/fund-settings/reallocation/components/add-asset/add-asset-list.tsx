import clsx from "clsx";
import { Center } from "components/center/center";
import { CurrencyItem } from "components/currency-item/currency-item";
import Regulator, { TRegulatorHandle } from "components/regulator/regulator";
import { Text } from "components/text/text";
import * as React from "react";
import { AnyObjectType, PlatformAssetFull } from "utils/types";

import styles from "./add-asset.module.scss";

export type TRegulatorInputHandle = (
  asset: PlatformAssetFull
) => React.ChangeEventHandler<HTMLInputElement>;

interface Props {
  remainder: number;
  assets: PlatformAssetFull[];
  onDown: TRegulatorHandle;
  onUp: TRegulatorHandle;
  onPercentChange: TRegulatorInputHandle;
}

interface AssetLineProps {
  remainder: number;
  asset: PlatformAssetFull;
  handleDown: TRegulatorHandle;
  handleUp: TRegulatorHandle;
  handlePercentChange: TRegulatorInputHandle;
}

const AssetLine: React.FC<AssetLineProps> = React.memo(
  ({ remainder, asset, handleDown, handleUp, handlePercentChange }) => (
    <tr>
      <td>
        <CurrencyItem
          url={asset.url}
          logo={asset.logoUrl}
          small
          name={asset.name}
          symbol={asset.name}
        />
      </td>
      <td>
        <Text muted>{asset.asset}</Text>
      </td>
      <td>
        <Regulator
          remainder={remainder}
          minValue={asset.mandatoryFundPercent}
          value={asset.percent}
          handleDown={handleDown(asset)}
          handleUp={handleUp(asset)}
        >
          <Center
            className={styles["add-fund-asset-popover__regulator-indicator"]}
          >
            <input
              value={asset.percent}
              onChange={handlePercentChange(asset)}
              className={clsx(
                styles["add-fund-asset-popover__regulator-input"],
                {
                  [styles["add-fund-asset-popover__regulator-input--mute"]]:
                    asset.percent === 0
                }
              )}
            />
            %
          </Center>
        </Regulator>
      </td>
    </tr>
  )
);

const _AddAssetList: React.FC<Props> = props => {
  const { remainder, assets, onDown, onUp, onPercentChange } = props;
  const providers = Object.keys(
    assets
      .map(({ provider }) => provider)
      .reduce((prev, curr) => {
        if (!prev[curr as string]) return { ...prev, [curr]: curr };
        else return prev;
      }, {} as AnyObjectType)
  );

  return (
    <table>
      <tbody>
        {providers.map(provider => {
          return (
            <>
              {providers.length > 1 && (
                <tr>
                  <td colSpan={3}>
                    <Text muted>{provider}</Text>
                  </td>
                </tr>
              )}
              {assets
                .filter(asset => asset.provider === provider)
                .map(asset => (
                  <AssetLine
                    remainder={remainder}
                    asset={asset}
                    handleDown={onDown}
                    handleUp={onUp}
                    handlePercentChange={onPercentChange}
                    key={asset.id}
                  />
                ))}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

const AddAssetList = React.memo(_AddAssetList);
export default AddAssetList;
