import { __rest, __awaiter } from 'tslib';
import React, { memo, useState, useEffect } from 'react';
import invariant from 'tiny-invariant';
import { Web3Provider } from '@ethersproject/providers';
import { CHAINS } from '@lynx-sdk/constants';
import { getStaticRpcBatchProvider } from '@lynx-sdk/providers';
import { ProviderSDK as ProviderSDK$1 } from '@lynx-sdk/react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { holesky, ReefKnot } from '@reef-knot/core-react';
import { useAccount } from 'wagmi';
import * as wagmiChains from 'wagmi/chains';
import { useWeb3 } from '../hooks/useWeb3.js';
import { POLLING_INTERVAL } from '../constants/web3.js';
import '../constants/connectors.js';
import '@gnosis.pm/safe-apps-web3-react';
import '@web3-react/injected-connector';
import '@web3-react/walletlink-connector';
import '@reef-knot/ledger-connector';
import '../helpers/ua.js';
import ProviderConnectors from './connectors.js';
import 'tiny-warning';

function getLibrary(provider) {
  var library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}
var ProviderSDK = props => {
  var {
      rpc,
      defaultChainId,
      supportedChainIds,
      children,
      pollingInterval = POLLING_INTERVAL
    } = props,
    rest = __rest(props, ["rpc", "defaultChainId", "supportedChainIds", "children", "pollingInterval"]);
  var {
    active: isConnectedViaWeb3React,
    library
  } = useWeb3React();
  var {
    chainId = defaultChainId,
    account,
    active
  } = useWeb3();
  var {
    connector: connectorWagmi,
    isConnected: isConnectedViaWagmi
  } = useAccount();
  var [providerWeb3, setProviderWeb3] = useState();
  // Reset web3 provider if the provider was set previously,
  // and currently no wallet is connected via wagmi or web3-react.
  // Gets triggered on a wallet disconnection, for example.
  if (!active && providerWeb3) {
    setProviderWeb3(undefined);
  }
  // Switching providers between wagmi and web3-react.
  // This code is neither clean nor efficient, but it will be deprecated after transition to wagmi is complete.
  // useEffect is needed here because we are calling getProvider async method from wagmi,
  // which can be taken as an external API
  useEffect(() => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
      if (!providerWeb3 && connectorWagmi && isConnectedViaWagmi) {
        // Set wagmi provider
        var p = yield connectorWagmi.getProvider();
        setProviderWeb3(getLibrary(p));
      } else if (!providerWeb3 && library && isConnectedViaWeb3React) {
        // Set web3-react provider
        // Passing `library` as init value for useState does not work, but works like this:
        setProviderWeb3(library);
      }
    }))();
  }, [connectorWagmi, isConnectedViaWagmi, isConnectedViaWeb3React, library, providerWeb3]);
  invariant(rpc[chainId], "RPC url for chain ".concat(chainId, " is not provided"));
  invariant(rpc[CHAINS.Mainnet], 'RPC url for mainnet is not provided');
  var providerRpc = getStaticRpcBatchProvider(chainId, rpc[chainId], 0, pollingInterval);
  var providerMainnetRpc = getStaticRpcBatchProvider(CHAINS.Mainnet, rpc[CHAINS.Mainnet], 0, pollingInterval);
  return /*#__PURE__*/React.createElement(ProviderSDK$1, Object.assign({
    chainId: chainId,
    supportedChainIds: supportedChainIds,
    providerWeb3: providerWeb3,
    providerRpc: providerRpc,
    providerMainnetRpc: providerMainnetRpc,
    account: account !== null && account !== void 0 ? account : undefined
  }, rest), children);
};
var ProviderWeb3 = props => {
  var {
      children,
      rpc,
      walletconnectProjectId,
      appName,
      appLogoUrl
    } = props,
    sdkProps = __rest(props, ["children", "rpc", "walletconnectProjectId", "appName", "appLogoUrl"]);
  var {
    defaultChainId,
    supportedChainIds
  } = props;
  var connectorsProps = {
    rpc,
    appName,
    appLogoUrl,
    defaultChainId
  };
  var wagmiChainsArray = Object.values(Object.assign(Object.assign({}, wagmiChains), {
    holesky
  }));
  var supportedWagmiChains = wagmiChainsArray.filter(chain => supportedChainIds.includes(chain.id));
  var defaultWagmiChain = wagmiChainsArray.find(chain => chain.id === defaultChainId);
  return /*#__PURE__*/React.createElement(Web3ReactProvider, {
    getLibrary: getLibrary
  }, /*#__PURE__*/React.createElement(ProviderSDK, Object.assign({
    rpc: rpc
  }, sdkProps), /*#__PURE__*/React.createElement(ReefKnot, {
    rpc: rpc,
    walletconnectProjectId: walletconnectProjectId,
    chains: supportedWagmiChains,
    defaultChain: defaultWagmiChain
  }, /*#__PURE__*/React.createElement(ProviderConnectors, Object.assign({}, connectorsProps), children))));
};
const web3 = /*#__PURE__*/memo(ProviderWeb3);

export { web3 as default };
