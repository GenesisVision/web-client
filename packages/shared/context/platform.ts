import { PlatformInfo } from "gv-api-web";
import React from "react";
export const platformContext = React.createContext<PlatformInfo | null>(null);
