"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZerionProvider = exports.isXdefiProvider = exports.isXdefiInstalled = exports.isExodusProvider = exports.isBraveWalletProvider = exports.isTallyProvider = exports.isCoinbaseProvider = exports.isDappBrowserProvider = exports.isTrustProvider = exports.isImTokenProvider = exports.isCoin98Provider = exports.isMetamaskProvider = exports.hasInjected = void 0;
var ua_1 = require("./ua");
var hasInjected = function () {
    try {
        return !!window.ethereum;
    }
    catch (error) {
        return false;
    }
};
exports.hasInjected = hasInjected;
var isMetamaskProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isMetaMask);
    }
    catch (error) {
        return false;
    }
};
exports.isMetamaskProvider = isMetamaskProvider;
var isCoin98Provider = function () {
    var _a;
    try {
        // @ts-expect-error wagmi redeclares window.ethereum type
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isCoin98);
    }
    catch (error) {
        return false;
    }
};
exports.isCoin98Provider = isCoin98Provider;
var isImTokenProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isImToken);
    }
    catch (error) {
        return false;
    }
};
exports.isImTokenProvider = isImTokenProvider;
var isTrustProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isTrust);
    }
    catch (error) {
        return false;
    }
};
exports.isTrustProvider = isTrustProvider;
var isDappBrowserProvider = function () {
    return ua_1.isMobileOrTablet && (0, exports.hasInjected)();
};
exports.isDappBrowserProvider = isDappBrowserProvider;
var isCoinbaseProvider = function () {
    try {
        if (window.ethereum) {
            var _a = window.ethereum, isCoinbaseWallet = _a.isCoinbaseWallet, providers = _a.providers;
            if (isCoinbaseWallet !== undefined)
                return isCoinbaseWallet;
            // Handle the case when Coinbase knows that other wallets extensions
            // are installed too, so it changes its behaviour and adds `providers`.
            if (providers === null || providers === void 0 ? void 0 : providers.length) {
                return providers.some(function (provider) { return provider.isCoinbaseWallet; });
            }
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
exports.isCoinbaseProvider = isCoinbaseProvider;
var isTallyProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isTally);
    }
    catch (error) {
        return false;
    }
};
exports.isTallyProvider = isTallyProvider;
var isBraveWalletProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isBraveWallet);
    }
    catch (error) {
        return false;
    }
};
exports.isBraveWalletProvider = isBraveWalletProvider;
var isExodusProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isExodus);
    }
    catch (error) {
        return false;
    }
};
exports.isExodusProvider = isExodusProvider;
var isXdefiInstalled = function () {
    try {
        return !!window.xfi;
    }
    catch (error) {
        return false;
    }
};
exports.isXdefiInstalled = isXdefiInstalled;
var isXdefiProvider = function () {
    try {
        var ethereum = window.ethereum;
        if (ethereum) {
            // At the moment of writing, `isXDEFI` and `__XDEFI` options are not documented.
            // If XDEFI is installed and the "Prioritise XDEFI" setting is true,
            // then `isXDEFI` option becomes unexpectedly set to `false`.
            // So, we can just check if this option is in `ethereum` provider object.
            // `__XDEFI` option is used as a fallback.
            return ((0, exports.isXdefiInstalled)() &&
                (Object.hasOwn(ethereum, 'isXDEFI') ||
                    Object.hasOwn(ethereum, '__XDEFI')));
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
exports.isXdefiProvider = isXdefiProvider;
var isZerionProvider = function () {
    var _a;
    try {
        return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isZerion);
    }
    catch (error) {
        return false;
    }
};
exports.isZerionProvider = isZerionProvider;
