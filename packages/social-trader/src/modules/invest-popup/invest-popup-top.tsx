import { BlurContainer } from "components/blur-container/blur-container";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";
import {
    adaptiveMargin,
    adaptivePadding,
    fontSize,
    horizontalPaddings,
    verticalPaddings
} from "utils/style/mixins";
import {
    $fontSizeCommon,
    $paddingBig,
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
  ${adaptivePadding("top", 50)};
`;

const Subtitle = styled(Row)`
  ${fontSize($fontSizeCommon)};
  letter-spacing: 0.4px;
  color: #e8eff3;
`;

const Roww = styled(Row)`
  justify-content: space-between;
  /* ${adaptiveMargin("top", 12)}; */
`;

const TitleBlock = styled.div`
  margin-right: 30px;
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
            <Roww wide>
                <h2>{title}</h2>
                <BlurContainer blur={!!isPending}>
                    <Text size={"xlarge"} wrap>
                        {text}
                    </Text>
                </BlurContainer>
            </Roww>
            <Roww wide>
                <Subtitle size={"small"}>{subtitle}</Subtitle>
                <Text wrap muted>
                    {labelText}
                </Text>
            </Roww>
            {/* <TitleBlock>
                <Row>
                    <h2>{title}</h2>
                </Row>
                <Subtitle size={"small"}>{subtitle}</Subtitle>
            </TitleBlock>
            {text && labelText && (
                <div>
                    <LabeledValue label={labelText}>
                        <BlurContainer blur={!!isPending}>
                            <Text size={"xlarge"}>{text}</Text>
                        </BlurContainer>
                    </LabeledValue>
                </div>
            )} */}
        </Container>
    );
};

const InvestPopupTop = React.memo(_InvestPopupTop);
export default InvestPopupTop;
