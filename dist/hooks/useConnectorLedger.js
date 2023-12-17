import { __awaiter } from 'tslib';
import { useCallback } from 'react';
import { useConnectors } from './useConnectors.js';
import { useForceDisconnect } from './useDisconnect.js';
import { useWeb3 } from './useWeb3.js';

var useConnectorLedger = args => {
  var {
    ledger
  } = useConnectors();
  var {
    activate
  } = useWeb3();
  var {
    disconnect
  } = useForceDisconnect();
  var onConnect = args === null || args === void 0 ? void 0 : args.onConnect;
  var connect = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
    disconnect();
    // Workaround for an issue when connection does not happen because of
    // Warning: Suppressed stale connector activation [object Object]
    // Reproducible on a stake widget, but not in the reef-knot demo app.
    // This is web3-react related issue, see https://github.com/Uniswap/web3-react/issues/78
    // In our case may happen because `disconnect()` on the upper line is not awaited.
    // Leaving it like this, because web3-react will be removed soon and the code will be rewritten.
    yield new Promise(resolve => setTimeout(resolve, 500));
    yield activate(ledger, () => {}, true);
    onConnect === null || onConnect === void 0 ? void 0 : onConnect();
  }), [activate, disconnect, ledger, onConnect]);
  return {
    connect,
    connector: ledger
  };
};

export { useConnectorLedger };
