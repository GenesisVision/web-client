import GVButton from "components/gv-button";
import GVTextField from "components/gv-text-field";
import { Row } from "components/row/row";
import React, { useState } from "react";

export const BinanceTradeLogin: React.FC<{
  onSubmit: (values: any) => void;
}> = ({ onSubmit }) => {
  const [privateKey, setPrivateKey] = useState();
  const [publicKey, setPublicKey] = useState();
  const handleSubmit = () => {
    onSubmit({ privateKey, publicKey });
  };
  return (
    <div>
      <Row>
        <GVTextField
          label={"privateKey"}
          name={"privateKey"}
          onChange={({ target: { value } }: React.ChangeEvent<any>) =>
            setPrivateKey(value)
          }
        />
      </Row>
      <Row>
        <GVTextField
          label={"publicKey"}
          name={"publicKey"}
          onChange={({ target: { value } }: React.ChangeEvent<any>) =>
            setPublicKey(value)
          }
        />
      </Row>
      <Row>
        <GVButton onClick={handleSubmit}>Login</GVButton>
      </Row>
    </div>
  );
};
