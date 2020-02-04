import * as React from "react";

const Crashable = <T extends { [k: string]: any }>(
  Component: React.ComponentType<T>
): React.ComponentType<T> => (props: T) => {
  const entries = Object.entries(props);
  for (const [name, value] of entries) {
    if (value === null || value === undefined) {
      console.log(`Crashable: Prop "${name}" of ${Component.name} is empty`);
      return null;
    }
  }
  return <Component {...props} />;
};

export default Crashable;
