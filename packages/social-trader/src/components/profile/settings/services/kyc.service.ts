import { api } from "services/api-client/swagger-custom-client";

export const loadKycIFrame = (externalUserId: string) => {
  const $script = require("scriptjs");
  $script(process.env.NEXT_PUBLIC_IDENSIC_SRC, function() {
    if (!(window as any).idensic.init) return;
    api
      .profile()
      .getWebVerificationToken()
      .then(data => {
        (window as any).idensic.init(
          // selector of an IFrame container (see above)
          "#idensic",
          // configuration object (see preparation steps)
          {
            clientId: "Genesis",
            externalUserId,
            accessToken: data.accessToken,
            excludedCountries: ["USA"],
            lang: "en",
            applicantDataPage: {
              enabled: true,
              fields: [
                {
                  name: "firstName",
                  required: true
                },
                {
                  name: "lastName",
                  required: true
                },
                {
                  name: "email",
                  required: true
                },
                {
                  name: "phone",
                  required: true
                },
                {
                  name: "country",
                  required: true
                }
              ]
            },
            requiredDocuments:
              "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE",
            uiConf: {
              customCss: "https://genesis.vision/assets/kyc/style.css?v=1",
              steps: {}
            }
          },
          // function for the IFrame callbacks
          function(messageType: any, payload: any) {
            // just logging the incoming messages
            console.log(
              "[IDENSIC DEMO] Idensic message:",
              messageType,
              payload
            );
          }
        );
      });
  });
};
