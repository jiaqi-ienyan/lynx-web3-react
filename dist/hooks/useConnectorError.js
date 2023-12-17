import { useWeb3 } from './useWeb3.js';
import { useReefKnotContext } from '@reef-knot/core-react';
import '../helpers/ua.js';
import { interceptLedgerError } from '../helpers/interceptLedgerError.js';
import { getUnsupportedChainError } from '../helpers/unsupportedChainError.js';
import { useConnectorInfo } from './useConnectorInfo.js';
import { useSupportedChains } from './useSupportedChains.js';

var useConnectorError = () => {
  var {
    error
  } = useWeb3();
  var {
    isLedger
  } = useConnectorInfo();
  var {
    isUnsupported
  } = useSupportedChains();
  var {
    chains: supportedChains
  } = useReefKnotContext();
  if (!error) {
    return;
  }
  if (isUnsupported) {
    return getUnsupportedChainError(supportedChains);
  }
  if (isLedger) {
    return interceptLedgerError(error);
  }
  return error;
};

export { useConnectorError };
