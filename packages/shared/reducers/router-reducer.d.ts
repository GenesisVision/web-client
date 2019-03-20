import { RouterActionType } from "connected-react-router";
import { Location } from "history";

interface LocationState extends Location {
  prevPath?: string;
}

export interface RouterState {
  location: LocationState;
  action: RouterActionType;
}
