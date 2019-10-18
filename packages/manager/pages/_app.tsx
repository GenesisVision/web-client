import React from "react";
import { _AppCreator } from "shared/routes/ssr/_app";
import { initializeStore } from "store";

export default _AppCreator(initializeStore);
