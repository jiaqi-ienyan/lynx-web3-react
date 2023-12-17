type ConnectorInfo = {
    providerName?: string;
    isConnectedViaWagmi: boolean;
    isGnosis: boolean;
    isLedger: boolean;
    isLedgerLive: boolean;
    isWalletLink: boolean;
    isCoinbase: boolean;
    isMetamask: boolean;
    isImToken: boolean;
    isTrust: boolean;
    isXdefi: boolean;
    isDappBrowser: boolean;
    isInjected: boolean;
};
export declare const useConnectorInfo: () => ConnectorInfo;
export {};
