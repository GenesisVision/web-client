import { Location } from "history";

export const getLocation = () => (window.location as unknown) as Location<any>;
