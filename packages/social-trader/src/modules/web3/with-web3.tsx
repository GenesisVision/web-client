import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

import { useEagerConnect } from "./hooks/eager-connect.hook";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const withWeb3 = <P extends {}>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => props => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <EagerConnect>
        <Component {...props} />
      </EagerConnect>
    </Web3ReactProvider>
  );
};

const EagerConnect: React.FC = ({ children }) => {
  useEagerConnect();
  return <>{children}</>;
};
