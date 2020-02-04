import * as React from "react";

const Leverage: React.FC<Props> = React.memo(({ min, max }) => {
  switch (min === max) {
    case true:
      return <>1:{min}</>;
    case false:
      return (
        <>
          1:{min}-1:{max}
        </>
      );
  }
});

interface Props {
  min: number;
  max: number;
}

export default Leverage;
