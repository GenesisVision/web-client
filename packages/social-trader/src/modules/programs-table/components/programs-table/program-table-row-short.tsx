import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { Text } from "components/text/text";
import { ASSET, STATUS } from "constants/constants";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import { IconFavoriteButton } from "modules/toggle-asset-favorite-button/icon-favorite-button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import styled from "styled-components";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { transition } from "utils/style/mixins";

interface IProgramTableRowShortProps {
  program: ProgramDetailsListItem;
}

const LinkName = styled(Text)`
  margin-bottom: 3px;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  &:hover {
    opacity: 0.4;
  }
  ${transition("opacity")}
`;

const ChartCell = styled(TableCell)`
  max-width: 136px;
  width: 136px;
`;

const DailyPeriod = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FavoriteIcon = styled.div`
  width: 20px;
  height: 19px;
  ${mediaBreakpointLandscapePhone(`
    width: 28px;
    height: 27px;
  `)}
`;

const _ProgramTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  program
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { linkCreator } = useToLink();
  const { t } = useTranslation();
  const {
    status,
    logoUrl,
    level,
    levelProgress,
    color,
    periodStarts,
    periodEnds,
    statistic,
    personalDetails,
    availableToInvest,
    type,
    tags,
    balance,
    investorsCount
  } = program;
  const programLinkProps = linkCreator(
    composeProgramDetailsUrl(program.url),
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
  const { currency, amount } = balance;
  return (
    <TableRow>
      <TableCell height={"small"}>
        <Link to={programLinkProps} noColor>
          <AssetAvatarWithName
            url={logoUrl}
            level={level}
            levelProgress={levelProgress}
            alt={program.title}
            color={color}
            tooltip={<LevelTooltip level={level} canLevelUp={false} />}
            name={
              <>
                <LinkName sizeValue={"14"}>{program.title}</LinkName>
                <div>
                  <TagProgramContainer tags={tags} />
                </div>
              </>
            }
          />
        </Link>
      </TableCell>
      <TableCell>
        <NumberFormat
          value={formatCurrencyValue(amount, currency)}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell>{investorsCount}</TableCell>
      <TableCell>
        <NumberFormat
          value={formatCurrencyValue(availableToInvest, currency)}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell>
        {type === "FixedPeriod" ? (
          <>
            {periodStarts && (
              <ProgramPeriodPie
                condition={status !== STATUS.CLOSED}
                loader={t("program-period.program-closed")}
                start={periodStarts}
                end={periodEnds}
              />
            )}
          </>
        ) : (
          <DailyPeriod>—</DailyPeriod>
        )}
      </TableCell>
      <TableCell>{distanceDate(program.creationDate)}</TableCell>
      <TableCell>
        <NumberFormat
          value={formatValue(statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell>
        <Profitability
          value={formatValue(statistic.profit, 2)} /*statistic.profitPercent*/
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(statistic.profit, 2)} /*statistic.profitPercent*/
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <ChartCell height={"small"}>
        <ProgramSimpleChart data={statistic?.chart} />
      </ChartCell>
      {isAuthenticated && personalDetails && (
        <TableCell>
          <FavoriteIcon>
            <IconFavoriteButton asset={program} assetType={ASSET.PROGRAM} />
          </FavoriteIcon>
        </TableCell>
      )}
    </TableRow>
  );
};

const ProgramTableRowShort = React.memo(_ProgramTableRowShort);
export default ProgramTableRowShort;
