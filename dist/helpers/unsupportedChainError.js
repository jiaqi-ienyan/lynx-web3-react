var getUnsupportedChainError = supportedChains => {
  // Get names of supported chains to suggest them in case of "unsupported network" error
  var supportedChainsNames = (() => {
    var chains = supportedChains.map(_ref => {
      var {
        name
      } = _ref;
      return name;
    }).filter(chainName => chainName !== 'unknown');
    var lastChain = chains.pop();
    return [chains.join(', '), lastChain].filter(chain => chain).join(' or ');
  })();
  return new Error("Unsupported chain. Please switch to ".concat(supportedChainsNames, " in your wallet and restart the page."));
};

export { getUnsupportedChainError };
