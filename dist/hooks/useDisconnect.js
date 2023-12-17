import { __awaiter } from 'tslib';
import { useCallback } from 'react';
import { useDisconnect as useDisconnect$1 } from 'wagmi';
import { useWeb3 } from './useWeb3.js';
import { useConnectorInfo } from './useConnectorInfo.js';

var useForceDisconnect = () => {
  var {
    deactivate,
    connector
  } = useWeb3();
  var extendedConnector = connector;
  var {
    disconnectAsync: wagmiDisconnect
  } = useDisconnect$1();
  var disconnect = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // disconnect wallets connected through web3-react connectors
    deactivate();
    extendedConnector === null || extendedConnector === void 0 ? void 0 : extendedConnector.deactivate();
    yield (_a = extendedConnector === null || extendedConnector === void 0 ? void 0 : extendedConnector.close) === null || _a === void 0 ? void 0 : _a.call(extendedConnector);
    // disconnect wallets connected through wagmi connectors
    yield wagmiDisconnect();
  }), [deactivate, extendedConnector, wagmiDisconnect]);
  return {
    disconnect
  };
};
var useDisconnect = () => {
  var {
    active
  } = useWeb3();
  var {
    disconnect
  } = useForceDisconnect();
  var {
    isGnosis,
    isLedgerLive,
    isDappBrowser
  } = useConnectorInfo();
  var available = active && !isGnosis && !isDappBrowser && !isLedgerLive;
  return {
    disconnect: available ? disconnect : undefined
  };
};

export { useDisconnect, useForceDisconnect };
