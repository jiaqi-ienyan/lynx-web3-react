import { useWeb3React } from '@web3-react/core';
export { UnsupportedChainIdError } from '@web3-react/core';
import { useAccount, useNetwork, useConnect } from 'wagmi';
import { useSupportedChains } from './useSupportedChains.js';

// Shimming useWeb3React hook to also use data returned from wagmi
function useWeb3(_key) {
  var _a;
  var web3ReactData = useWeb3React();
  var wagmiAccount = useAccount();
  var wagmiNetwork = useNetwork();
  var {
    error: wagmiError
  } = useConnect();
  var account = web3ReactData.account || (wagmiAccount === null || wagmiAccount === void 0 ? void 0 : wagmiAccount.address);
  // web3-react and wagmi have different logic around unsupported chains.
  // If a chain is not supported:
  // web3-react sets:
  //   `chainId` === undefined
  //   `error` === UnsupportedChainIdError
  //   `active` === false
  // wagmi sets:
  //   `chain.id` === actual value from wallet
  //   `chain.unsupported` === true
  //   `error` === null
  //   `isConnected` === true (connects via default chain)
  // These differences break our widgets, because the widgets don't expect
  // chainId to be unsupported, they expect chainId === undefined in that case.
  // Making wagmi's logic to be the same as web3-react here, except setting an error:
  var {
    isUnsupported
  } = useSupportedChains();
  var chainId = isUnsupported ? undefined : web3ReactData.chainId || ((_a = wagmiNetwork === null || wagmiNetwork === void 0 ? void 0 : wagmiNetwork.chain) === null || _a === void 0 ? void 0 : _a.id);
  var active = isUnsupported ? false : web3ReactData.active || (wagmiAccount === null || wagmiAccount === void 0 ? void 0 : wagmiAccount.isConnected);
  // wagmi and web3-react use the same Error type
  // wagmi is first here because it can be null, but we need Error | undefined
  var error = wagmiError || web3ReactData.error;
  return Object.assign(Object.assign({}, web3ReactData), {
    chainId,
    account,
    active,
    error
  });
}

export { useWeb3 };
