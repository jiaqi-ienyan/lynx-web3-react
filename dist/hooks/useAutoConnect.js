import { __awaiter } from 'tslib';
import { useRef, useContext, useEffect } from 'react';
import { AcceptTermsModalContext, LS_KEY_TERMS_ACCEPTANCE } from '@reef-knot/core-react';
import { useWeb3 } from './useWeb3.js';
import { useConnectorStorage } from './useConnectorStorage.js';
import { useConnectorInfo } from './useConnectorInfo.js';
import { useDisconnect } from './useDisconnect.js';
import { isDappBrowserProvider } from '../helpers/providerDetectors.js';
import '../helpers/ua.js';

var isTermsAccepted = () => {
  var _a;
  if (typeof window !== 'undefined') {
    return ((_a = window.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(LS_KEY_TERMS_ACCEPTANCE)) === 'true';
  }
  return false;
};
var useAutoConnect = connectors => {
  useEagerConnector(connectors);
  useSaveConnectorToLS();
  useDeleteConnectorFromLS();
  useWatchConnectorInLS();
};
var useEagerConnector = connectors => {
  var {
    active,
    activate
  } = useWeb3();
  var [savedConnector] = useConnectorStorage();
  var tried = useRef(false);
  var {
    isConnectedViaWagmi
  } = useConnectorInfo();
  var {
    gnosis,
    ledgerlive,
    injected
  } = connectors;
  var {
    acceptTermsModal
  } = useContext(AcceptTermsModalContext);
  useEffect(() => {
    if (isConnectedViaWagmi || tried.current || active) return;
    void (() => __awaiter(void 0, void 0, void 0, function* () {
      var _a, _b;
      tried.current = true;
      var isLedgerApp = ledgerlive === null || ledgerlive === void 0 ? void 0 : ledgerlive.isLedgerApp(); // Ledger Live iframe
      var isSafeApp = yield gnosis === null || gnosis === void 0 ? void 0 : gnosis.isSafeApp(); // Gnosis iframe
      var isDappBrowser = isDappBrowserProvider();
      var shouldAutoConnectApp = isLedgerApp || isSafeApp || isDappBrowser;
      var connector = (() => {
        if (shouldAutoConnectApp) {
          if (isLedgerApp) return ledgerlive;
          if (isSafeApp && gnosis) return gnosis;
          if (isDappBrowser) return injected;
        }
        // Saved in LS
        var saved = savedConnector && connectors[savedConnector];
        if (saved) return saved;
        return null;
      })();
      if (!connector) return;
      var connectWallet = () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e, _f;
        var error = undefined;
        try {
          yield activate(connector, undefined, true);
        } catch (e) {
          error = e;
        }
        if (shouldAutoConnectApp) {
          if (!isTermsAccepted() || error) {
            (_c = acceptTermsModal.setError) === null || _c === void 0 ? void 0 : _c.call(acceptTermsModal, error);
            (_d = acceptTermsModal.setVisible) === null || _d === void 0 ? void 0 : _d.call(acceptTermsModal, true);
          } else {
            (_e = acceptTermsModal.setVisible) === null || _e === void 0 ? void 0 : _e.call(acceptTermsModal, false);
            (_f = acceptTermsModal.setError) === null || _f === void 0 ? void 0 : _f.call(acceptTermsModal, undefined);
          }
        }
      });
      if (shouldAutoConnectApp && !isTermsAccepted()) {
        (_a = acceptTermsModal.setOnContinue) === null || _a === void 0 ? void 0 : _a.call(acceptTermsModal, () => connectWallet);
        (_b = acceptTermsModal.setVisible) === null || _b === void 0 ? void 0 : _b.call(acceptTermsModal, true);
        return;
      }
      yield connectWallet();
    }))();
  }, [activate, active, isConnectedViaWagmi, ledgerlive, gnosis, savedConnector, connectors, injected, acceptTermsModal]);
};
var useSaveConnectorToLS = () => {
  var [, saveConnector] = useConnectorStorage();
  var {
    isInjected,
    isDappBrowser,
    isLedger,
    isConnectedViaWagmi
  } = useConnectorInfo();
  useEffect(() => {
    if (!isConnectedViaWagmi) {
      if (isInjected && !isDappBrowser) return saveConnector('injected');
      if (isLedger) return saveConnector('ledger');
    }
  }, [isLedger, isInjected, isDappBrowser, saveConnector, isConnectedViaWagmi]);
};
var useDeleteConnectorFromLS = () => {
  var [, saveConnector] = useConnectorStorage();
  var {
    active
  } = useWeb3();
  var lastState = useRef(active);
  useEffect(() => {
    var isStateChanged = lastState.current !== active;
    var isDisconnected = !active;
    lastState.current = active;
    if (isStateChanged && isDisconnected) {
      saveConnector(null);
    }
  }, [active, saveConnector]);
};
var useWatchConnectorInLS = () => {
  var [savedConnector] = useConnectorStorage();
  var {
    disconnect
  } = useDisconnect();
  var lastConnector = useRef(savedConnector);
  useEffect(() => {
    var isConnectorChanged = lastConnector.current !== savedConnector;
    var isDisconnected = !savedConnector;
    lastConnector.current = savedConnector;
    if (isConnectorChanged && isDisconnected) {
      disconnect === null || disconnect === void 0 ? void 0 : disconnect();
    }
  }, [savedConnector, disconnect]);
};

export { useAutoConnect, useDeleteConnectorFromLS, useEagerConnector, useSaveConnectorToLS, useWatchConnectorInLS };
