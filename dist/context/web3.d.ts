import { FC } from 'react';
import { CHAINS } from '@lynx-sdk/constants';
import { SWRConfiguration } from 'swr';
import { ConnectorsContextProps } from './connectors';
export interface ProviderWeb3Props extends ConnectorsContextProps {
    defaultChainId: CHAINS;
    supportedChainIds: CHAINS[];
    swrConfig?: SWRConfiguration;
    pollingInterval?: number;
    walletconnectProjectId?: string;
    onError?: (error: unknown) => void;
}
declare const _default: import("react").MemoExoticComponent<FC<ProviderWeb3Props>>;
export default _default;
