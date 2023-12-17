declare global {
    interface Window {
        xfi?: Record<string, unknown>;
        ethereum?: {
            isMetaMask?: boolean;
            isTrust?: boolean;
            isImToken?: boolean;
            isCoinbaseWallet?: boolean;
            isTally?: boolean;
            isExodus?: boolean;
            isXDEFI?: boolean;
            isZerion?: boolean;
            providers?: {
                isCoinbaseWallet?: boolean;
            }[];
        };
    }
}
export declare const hasInjected: () => boolean;
export declare const isMetamaskProvider: () => boolean;
export declare const isCoin98Provider: () => boolean;
export declare const isImTokenProvider: () => boolean;
export declare const isTrustProvider: () => boolean;
export declare const isDappBrowserProvider: () => boolean;
export declare const isCoinbaseProvider: () => boolean;
export declare const isTallyProvider: () => boolean;
export declare const isBraveWalletProvider: () => boolean;
export declare const isExodusProvider: () => boolean;
export declare const isXdefiInstalled: () => boolean;
export declare const isXdefiProvider: () => boolean;
export declare const isZerionProvider: () => boolean;
