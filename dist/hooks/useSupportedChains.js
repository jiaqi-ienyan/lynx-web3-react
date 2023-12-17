import { useMemo } from 'react';
import { getNetwork } from '@ethersproject/providers';
import { useNetwork } from 'wagmi';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

var STABLE_ARRAY = [];
var useSupportedChains = () => {
  var supportedIds = STABLE_ARRAY;
  var isUnsupported;
  // legacy web3-react data
  var {
    error,
    connector
  } = useWeb3React();
  // wagmi data
  var {
    chain,
    chains
  } = useNetwork();
  var wagmiSupportedChainIds = useMemo(() => chains.map(c => c.id), [chains]);
  // add chain ids from legacy web3-react connector
  if (connector === null || connector === void 0 ? void 0 : connector.supportedChainIds) {
    supportedIds = connector.supportedChainIds;
  }
  // add wagmi chain ids too
  if (wagmiSupportedChainIds.length > 0) {
    supportedIds = [...supportedIds, ...wagmiSupportedChainIds];
    supportedIds = [...new Set(supportedIds)]; // deduplicate ids
  }
  var supportedChains = useMemo(() => {
    return supportedIds.map(chainId => getNetwork(chainId));
  }, [supportedIds]);
  // legacy web3-react check
  isUnsupported = error instanceof UnsupportedChainIdError;
  // wagmi check
  isUnsupported = isUnsupported || !!(chain === null || chain === void 0 ? void 0 : chain.unsupported);
  return {
    isUnsupported,
    supportedChains
  };
};

export { useSupportedChains };
