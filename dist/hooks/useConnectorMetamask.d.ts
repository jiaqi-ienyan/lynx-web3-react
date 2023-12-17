import { InjectedConnector } from '@web3-react/injected-connector';
import { ConnectorHookArgs } from './types';
type ConnectorHookResult = {
    connect: () => Promise<void>;
    connector: InjectedConnector;
};
export declare const useConnectorMetamask: (args?: ConnectorHookArgs) => ConnectorHookResult;
export {};
