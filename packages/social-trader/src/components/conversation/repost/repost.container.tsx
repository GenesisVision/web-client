import { rePost } from "components/conversation/conversation.service";
import { PostInput } from "components/conversation/post/post-input/post-input";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

const _RePostContainer: React.FC<IRePostContainerProps> = ({ onApply, id }) => {
  const [t] = useTranslation();
  const onApplyMiddleware = postponeCallback(onApply);
  const { sendRequest, errorMessage, status } = useApiRequest({
    request: rePost,
    successMessage: t("Success"),
    middleware: [onApplyMiddleware]
  });
  const handleSubmit = useCallback(values => {
    return sendRequest({ ...values, id });
  }, []);

  return (
    <>
      <DialogTop title={t("conversation.repost")} />
      <DialogBottom fixed={false}>
        <Row>{t("conversation.your-message")}</Row>
        <Row>
          <PostInput
            allowEmptyMessage
            placeholder={""}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
            status={status}
          />
        </Row>
      </DialogBottom>
    </>
  );
};

export interface IRePostContainerProps {
  onApply?: VoidFunction;
  id: string;
}

const RePostContainer = React.memo(_RePostContainer);
export default RePostContainer;
