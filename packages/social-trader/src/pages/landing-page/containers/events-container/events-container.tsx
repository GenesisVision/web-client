import { PlatformEvent } from "gv-api-web";
import { useTranslation } from "i18n";
import EventsList from "pages/landing-page/components/events-list/events-list";
import {
  grid,
  horizontalPadding
} from "pages/landing-page/styles/landing-styles";
import React from "react";
import styled from "styled-components";
import {
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "utils/style/media";

interface Props {
  events: PlatformEvent[];
}

const Container = styled.div`
  ${grid}
  ${horizontalPadding}
   align-items: center;
`;

const Title = styled.h2`
  ${mediaBreakpointTablet("grid-column: 3/11;")}
  ${mediaBreakpointLandscapeTablet("grid-column: 4/10;")}
  text-align: center;
`;

const _EventsContainer: React.FC<Props> = ({ events }) => {
  const { t } = useTranslation();
  if (!events.length) return null;
  return (
    <Container>
      <Title>{t("landing-page:events.title")}</Title>
      <EventsList events={events} />
    </Container>
  );
};
const EventsContainer = React.memo(_EventsContainer);
export default EventsContainer;
