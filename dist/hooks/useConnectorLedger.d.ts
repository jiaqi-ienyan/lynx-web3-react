import { LedgerHQConnector } from '@reef-knot/ledger-connector';
import { ConnectorHookArgs } from './types';
type ConnectorHookResult = {
    connect: () => Promise<void>;
    connector: LedgerHQConnector;
};
export declare const useConnectorLedger: (args?: ConnectorHookArgs) => ConnectorHookResult;
export {};
