"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSupportedChains = void 0;
var react_1 = require("react");
var providers_1 = require("@ethersproject/providers");
var wagmi_1 = require("wagmi");
var core_1 = require("@web3-react/core");
var STABLE_ARRAY = [];
var useSupportedChains = function () {
    var supportedIds = STABLE_ARRAY;
    var isUnsupported;
    // legacy web3-react data
    var _a = (0, core_1.useWeb3React)(), error = _a.error, connector = _a.connector;
    // wagmi data
    var _b = (0, wagmi_1.useNetwork)(), chain = _b.chain, chains = _b.chains;
    var wagmiSupportedChainIds = (0, react_1.useMemo)(function () { return chains.map(function (c) { return c.id; }); }, [chains]);
    // add chain ids from legacy web3-react connector
    if (connector === null || connector === void 0 ? void 0 : connector.supportedChainIds) {
        supportedIds = connector.supportedChainIds;
    }
    // add wagmi chain ids too
    if (wagmiSupportedChainIds.length > 0) {
        supportedIds = __spreadArray(__spreadArray([], supportedIds, true), wagmiSupportedChainIds, true);
        supportedIds = __spreadArray([], new Set(supportedIds), true); // deduplicate ids
    }
    var supportedChains = (0, react_1.useMemo)(function () {
        return supportedIds.map(function (chainId) { return (0, providers_1.getNetwork)(chainId); });
    }, [supportedIds]);
    // legacy web3-react check
    isUnsupported = error instanceof core_1.UnsupportedChainIdError;
    // wagmi check
    isUnsupported = isUnsupported || !!(chain === null || chain === void 0 ? void 0 : chain.unsupported);
    return {
        isUnsupported: isUnsupported,
        supportedChains: supportedChains,
    };
};
exports.useSupportedChains = useSupportedChains;
