"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnsupportedChainError = void 0;
var getUnsupportedChainError = function (supportedChains) {
    // Get names of supported chains to suggest them in case of "unsupported network" error
    var supportedChainsNames = (function () {
        var chains = supportedChains
            .map(function (_a) {
            var name = _a.name;
            return name;
        })
            .filter(function (chainName) { return chainName !== 'unknown'; });
        var lastChain = chains.pop();
        return [chains.join(', '), lastChain].filter(function (chain) { return chain; }).join(' or ');
    })();
    return new Error("Unsupported chain. Please switch to ".concat(supportedChainsNames, " in your wallet and restart the page."));
};
exports.getUnsupportedChainError = getUnsupportedChainError;
