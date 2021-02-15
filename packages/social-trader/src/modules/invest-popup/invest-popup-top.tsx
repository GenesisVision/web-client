import { BlurContainer } from "components/blur-container/blur-container";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";
import { adaptivePadding, horizontalPaddings } from "utils/style/mixins";
import {
    $paddingMedium,
    $paddingSmall,
    $paddingUpperMedium
} from "utils/style/sizes";

export interface InvestPopupProps {
    title: string;
    subtitle: string;
    text?: string;
    labelText?: string;
    isPending?: boolean;
}

const Container = styled.div`
  background: #202a34;
  ${horizontalPaddings($paddingSmall)};
  ${adaptivePadding("bottom", $paddingMedium)};
  ${adaptivePadding("top", $paddingUpperMedium, 1.2)};
`;

const Subtitle = styled(Text)`
  letter-spacing: 0.4px;
`;

const RowBlock = styled(Row)`
  justify-content: space-between;
`;

const _InvestPopupTop: React.FC<InvestPopupProps> = ({
    title,
    subtitle,
    text,
    labelText,
    isPending
}) => {
    return (
        <Container>
            <RowBlock wide>
                <h2>{title}</h2>
                {text && (
                    <BlurContainer blur={!!isPending}>
                        <Text size={"xlarge"}>{text}</Text>
                    </BlurContainer>
                )}
            </RowBlock>
            <RowBlock wide>
                <Subtitle color={"white"}>{subtitle}</Subtitle>
                {labelText && <Text muted>{labelText}</Text>}
            </RowBlock>
        </Container>
    );
};

const InvestPopupTop = React.memo(_InvestPopupTop);
export default InvestPopupTop;
