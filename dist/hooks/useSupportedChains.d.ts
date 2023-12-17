import { Network } from '@ethersproject/providers';
export declare const useSupportedChains: () => {
    isUnsupported: boolean;
    supportedChains: Network[];
};
