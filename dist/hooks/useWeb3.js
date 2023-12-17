"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWeb3 = exports.UnsupportedChainIdError = void 0;
var core_1 = require("@web3-react/core");
var wagmi_1 = require("wagmi");
var useSupportedChains_1 = require("./useSupportedChains");
var core_2 = require("@web3-react/core");
Object.defineProperty(exports, "UnsupportedChainIdError", { enumerable: true, get: function () { return core_2.UnsupportedChainIdError; } });
// Shimming useWeb3React hook to also use data returned from wagmi
function useWeb3(_key) {
    var _a;
    var web3ReactData = (0, core_1.useWeb3React)();
    var wagmiAccount = (0, wagmi_1.useAccount)();
    var wagmiNetwork = (0, wagmi_1.useNetwork)();
    var wagmiError = (0, wagmi_1.useConnect)().error;
    var account = web3ReactData.account || (wagmiAccount === null || wagmiAccount === void 0 ? void 0 : wagmiAccount.address);
    // web3-react and wagmi have different logic around unsupported chains.
    // If a chain is not supported:
    // web3-react sets:
    //   `chainId` === undefined
    //   `error` === UnsupportedChainIdError
    //   `active` === false
    // wagmi sets:
    //   `chain.id` === actual value from wallet
    //   `chain.unsupported` === true
    //   `error` === null
    //   `isConnected` === true (connects via default chain)
    // These differences break our widgets, because the widgets don't expect
    // chainId to be unsupported, they expect chainId === undefined in that case.
    // Making wagmi's logic to be the same as web3-react here, except setting an error:
    var isUnsupported = (0, useSupportedChains_1.useSupportedChains)().isUnsupported;
    var chainId = isUnsupported
        ? undefined
        : web3ReactData.chainId || ((_a = wagmiNetwork === null || wagmiNetwork === void 0 ? void 0 : wagmiNetwork.chain) === null || _a === void 0 ? void 0 : _a.id);
    var active = isUnsupported
        ? false
        : web3ReactData.active || (wagmiAccount === null || wagmiAccount === void 0 ? void 0 : wagmiAccount.isConnected);
    // wagmi and web3-react use the same Error type
    // wagmi is first here because it can be null, but we need Error | undefined
    var error = wagmiError || web3ReactData.error;
    return __assign(__assign({}, web3ReactData), { chainId: chainId, account: account, active: active, error: error });
}
exports.useWeb3 = useWeb3;
