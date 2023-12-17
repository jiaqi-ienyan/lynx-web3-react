import { __awaiter } from 'tslib';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { useCallback } from 'react';
import { useConnectors } from './useConnectors.js';
import { useWeb3 } from './useWeb3.js';
import { isBraveWalletProvider, hasInjected } from '../helpers/providerDetectors.js';
import { checkIfBraveBrowser } from '../helpers/ua.js';
import { openWindow } from '../helpers/openWindow.js';
import { useForceDisconnect } from './useDisconnect.js';

var WALLET_URL = 'https://metamask.app.link/dapp/';
var useConnectorMetamask = args => {
  var {
    injected
  } = useConnectors();
  var {
    activate
  } = useWeb3();
  var {
    disconnect
  } = useForceDisconnect();
  var onConnect = args === null || args === void 0 ? void 0 : args.onConnect;
  var openInWallet = useCallback(() => {
    try {
      var {
        host,
        pathname,
        search
      } = window.location;
      var pageUrlWithoutProtocol = encodeURI(host + pathname + search);
      openWindow("".concat(WALLET_URL).concat(pageUrlWithoutProtocol));
    } catch (error) {
      warning(false, 'Failed to open the link');
    }
  }, []);
  var connect = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
    invariant(injected, 'Connector is required');
    // Brave Wallet mimics MetaMask.
    // If a user has the Brave Browser without the MetaMask extension we want
    // to redirect the user to the MetaMask website.
    // If MetaMask is installed, the isBraveWallet property will be false.
    if ((yield checkIfBraveBrowser()) && isBraveWalletProvider()) {
      openInWallet();
      return;
    }
    // Do not check for isMetamaskProvider here,
    // it will break an ability to connect with other EIP-1193 wallets,
    // which do not have their branded connection button
    // and recommend to click on MetaMask button in such case.
    if (hasInjected()) {
      yield disconnect();
      yield activate(injected);
      onConnect === null || onConnect === void 0 ? void 0 : onConnect();
    } else {
      openInWallet();
    }
  }), [injected, openInWallet, disconnect, activate, onConnect]);
  return {
    connect,
    connector: injected
  };
};

export { useConnectorMetamask };
