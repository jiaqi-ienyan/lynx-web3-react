import { isMobileOrTablet } from './ua.js';

var hasInjected = () => {
  try {
    return !!window.ethereum;
  } catch (error) {
    return false;
  }
};
var isMetamaskProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isMetaMask);
  } catch (error) {
    return false;
  }
};
var isCoin98Provider = () => {
  var _a;
  try {
    // @ts-expect-error wagmi redeclares window.ethereum type
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isCoin98);
  } catch (error) {
    return false;
  }
};
var isImTokenProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isImToken);
  } catch (error) {
    return false;
  }
};
var isTrustProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isTrust);
  } catch (error) {
    return false;
  }
};
var isDappBrowserProvider = () => {
  return isMobileOrTablet && hasInjected();
};
var isCoinbaseProvider = () => {
  try {
    if (window.ethereum) {
      var {
        isCoinbaseWallet,
        providers
      } = window.ethereum;
      if (isCoinbaseWallet !== undefined) return isCoinbaseWallet;
      // Handle the case when Coinbase knows that other wallets extensions
      // are installed too, so it changes its behaviour and adds `providers`.
      if (providers === null || providers === void 0 ? void 0 : providers.length) {
        return providers.some(provider => provider.isCoinbaseWallet);
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};
var isTallyProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isTally);
  } catch (error) {
    return false;
  }
};
var isBraveWalletProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isBraveWallet);
  } catch (error) {
    return false;
  }
};
var isExodusProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isExodus);
  } catch (error) {
    return false;
  }
};
var isXdefiInstalled = () => {
  try {
    return !!window.xfi;
  } catch (error) {
    return false;
  }
};
var isXdefiProvider = () => {
  try {
    var {
      ethereum
    } = window;
    if (ethereum) {
      // At the moment of writing, `isXDEFI` and `__XDEFI` options are not documented.
      // If XDEFI is installed and the "Prioritise XDEFI" setting is true,
      // then `isXDEFI` option becomes unexpectedly set to `false`.
      // So, we can just check if this option is in `ethereum` provider object.
      // `__XDEFI` option is used as a fallback.
      return isXdefiInstalled() && (Object.hasOwn(ethereum, 'isXDEFI') || Object.hasOwn(ethereum, '__XDEFI'));
    }
    return false;
  } catch (error) {
    return false;
  }
};
var isZerionProvider = () => {
  var _a;
  try {
    return !!((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.isZerion);
  } catch (error) {
    return false;
  }
};

export { hasInjected, isBraveWalletProvider, isCoin98Provider, isCoinbaseProvider, isDappBrowserProvider, isExodusProvider, isImTokenProvider, isMetamaskProvider, isTallyProvider, isTrustProvider, isXdefiInstalled, isXdefiProvider, isZerionProvider };
