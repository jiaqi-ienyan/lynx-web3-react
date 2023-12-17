import { FC } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { CHAINS } from '@lynx-sdk/constants';
import { LedgerHQConnector, LedgerHQFrameConnector } from '@reef-knot/ledger-connector';
export interface ConnectorsContextProps {
    defaultChainId: CHAINS;
    rpc: Record<number, string>;
    appName?: string;
    appLogoUrl?: string;
}
export type ConnectorsContextValue = {
    injected: InjectedConnector;
    ledgerlive: LedgerHQFrameConnector;
    ledger: LedgerHQConnector;
    gnosis?: SafeAppConnector;
};
export type Connector = keyof ConnectorsContextValue;
export declare const ConnectorsContext: import("react").Context<ConnectorsContextValue>;
declare const _default: import("react").MemoExoticComponent<FC<ConnectorsContextProps>>;
export default _default;
