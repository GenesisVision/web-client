import React from "react";
import { _AppCreator } from "routes/ssr/_app";
import { initializeStore } from "store";

export default _AppCreator(initializeStore);
