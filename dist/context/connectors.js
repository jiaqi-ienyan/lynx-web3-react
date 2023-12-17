import React, { memo, createContext, useMemo } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { useSDK } from '@lynx-sdk/react';
import { LedgerHQFrameConnector, LedgerHQConnector } from '@reef-knot/ledger-connector';
import { useAutoConnect } from '../hooks/useAutoConnect.js';
import { CONNECTOR_NAMES } from '../constants/connectors.js';

var ConnectorsContext = /*#__PURE__*/createContext({});
var ProviderConnectors = props => {
  var BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  var DEFAULT_LOGO = "".concat(BASE_URL, "/apple-touch-icon.png");
  var DEFAULT_NAME = 'Lido';
  var {
    rpc,
    children,
    defaultChainId,
    appName = DEFAULT_NAME,
    appLogoUrl = DEFAULT_LOGO
  } = props;
  var {
    supportedChainIds
  } = useSDK();
  var connectors = useMemo(() => ({
    [CONNECTOR_NAMES.INJECTED]: new InjectedConnector({
      supportedChainIds
    }),
    [CONNECTOR_NAMES.GNOSIS]: (() => {
      try {
        return new SafeAppConnector({
          supportedChainIds
        });
      } catch (error) {
        return undefined;
      }
    })(),
    [CONNECTOR_NAMES.LEDGER_HQ_LIVE]: new LedgerHQFrameConnector({
      supportedChainIds
    }),
    [CONNECTOR_NAMES.LEDGER]: new LedgerHQConnector({
      chainId: defaultChainId,
      url: rpc[defaultChainId]
    })
  }), [appLogoUrl, appName, rpc, defaultChainId, supportedChainIds]);
  useAutoConnect(connectors);
  return /*#__PURE__*/React.createElement(ConnectorsContext.Provider, {
    value: connectors
  }, children);
};
const ProviderConnectors$1 = /*#__PURE__*/memo(ProviderConnectors);

export { ConnectorsContext, ProviderConnectors$1 as default };
