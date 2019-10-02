import {
  Broker,
  CancelablePromise,
  ManagerProgramCreateResult,
  NewProgramRequest
} from "gv-api-web";
import brokersApi from "shared/services/api-client/brokers-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

import { ICreateProgramSettingsFormValues } from "../components/create-program-settings/create-program-settings";

const GM_BROKER_NAME = "Genesis Markets";

export const fetchBrokers = (): CancelablePromise<Broker[]> =>
  brokersApi.v10BrokersGet().then(data => {
    const gvBroker = data.brokers.find(x => x.name === GM_BROKER_NAME)!;
    data.brokers.splice(data.brokers.indexOf(gvBroker), 1);

    return [gvBroker, ...data.brokers];
  });

export const createProgram = (
  createProgramData: ICreateProgramSettingsFormValues
): CancelablePromise<ManagerProgramCreateResult> => {
  const authorization = authService.getAuthArg();

  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (createProgramData.logo.image) {
    promise = filesService.uploadFile(
      createProgramData.logo.image.cropped,
      authorization
    ) as CancelablePromise<any>;
  }
  return promise.then(response => {
    const requestData = <NewProgramRequest>{
      ...createProgramData,
      logo: response
    };

    return managerApi.v10ManagerProgramsCreatePost(authorization, {
      request: requestData
    });
  });
};
