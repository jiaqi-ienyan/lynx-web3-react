"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectorInfo = void 0;
var wagmi_1 = require("wagmi");
var safe_apps_web3_react_1 = require("@gnosis.pm/safe-apps-web3-react");
var injected_connector_1 = require("@web3-react/injected-connector");
var walletlink_connector_1 = require("@web3-react/walletlink-connector");
var ledger_connector_1 = require("@reef-knot/ledger-connector");
var useWeb3_1 = require("./useWeb3");
var constants_1 = require("../constants");
var helpers_1 = require("../helpers");
var useConnectorInfo = function () {
    var _a = (0, useWeb3_1.useWeb3)(), active = _a.active, connector = _a.connector;
    // === WAGMI connectors BEGIN
    var _b = (0, wagmi_1.useAccount)(), isConnected = _b.isConnected, wagmiConnector = _b.connector;
    var isConnectedViaWagmi = isConnected && !!wagmiConnector;
    // === WAGMI connectors END
    // === WEB3-REACT connectors BEGIN
    var isGnosis = active && connector instanceof safe_apps_web3_react_1.SafeAppConnector;
    var isLedgerLive = active && connector instanceof ledger_connector_1.LedgerHQFrameConnector;
    var isLedger = connector instanceof ledger_connector_1.LedgerHQConnector;
    // WalletLink is used by Coinbase, but it can be used by other wallets too.
    var isWalletLink = active && connector instanceof walletlink_connector_1.WalletLinkConnector;
    // This detection doesn't work for the connection via QR code scanning.
    var isCoinbase = active && (0, helpers_1.isCoinbaseProvider)();
    var isInjected = 
    // check for web3-react
    (active && connector instanceof injected_connector_1.InjectedConnector) ||
        // check for wagmi
        (isConnectedViaWagmi && wagmiConnector.id === 'injected');
    var isDappBrowser = isInjected && (0, helpers_1.isDappBrowserProvider)();
    var isMetamask = isInjected && (0, helpers_1.isMetamaskProvider)();
    var isImToken = isInjected && (0, helpers_1.isImTokenProvider)();
    var isTrust = isInjected && (0, helpers_1.isTrustProvider)();
    var isXdefi = isInjected && (0, helpers_1.isXdefiProvider)();
    var isZerion = isInjected && (0, helpers_1.isZerionProvider)();
    var providerName = (function () {
        if (isConnectedViaWagmi && wagmiConnector.name)
            return wagmiConnector.name;
        // Do not try to detect providerName if the app is opened in a mobile wallet dapp browser,
        // because such wallets often mimic other wallets which makes proper detection to be hard.
        // Also, if the app is opened in a mobile wallet dapp browser,
        // then we autoconnect the wallet via injected connector,
        // and we don't allow to disconnect in such case.
        // So it is easy for a user to understand which wallet app is being used for connection.
        if (isDappBrowser)
            return undefined;
        if (isGnosis)
            return constants_1.PROVIDER_NAMES.GNOSIS;
        if (isLedger)
            return constants_1.PROVIDER_NAMES.LEDGER;
        if (isLedgerLive)
            return constants_1.PROVIDER_NAMES.LEDGER_HQ_LIVE;
        if (isImToken)
            return constants_1.PROVIDER_NAMES.IM_TOKEN;
        if (isTrust)
            return constants_1.PROVIDER_NAMES.TRUST;
        // Wallets which has conflicts with each other.
        // The order of wallets checks here is important.
        // Most "aggressive" wallet, which overrides other wallets, goes first.
        if (isXdefi)
            return constants_1.PROVIDER_NAMES.XDEFI;
        if (isCoinbase)
            return constants_1.PROVIDER_NAMES.COINBASE;
        if (isZerion)
            return constants_1.PROVIDER_NAMES.ZERION;
        // Metamask should be last in this list because almost all EIP-1193 wallets
        // are trying to mimic Metamask by setting isMetamask = true
        if (isMetamask)
            return constants_1.PROVIDER_NAMES.METAMASK;
        // General providers which doesn't specify what exact wallet is being used.
        // Works as a fallback.
        if (isWalletLink)
            return constants_1.PROVIDER_NAMES.WALLET_LINK;
        if (isInjected)
            return constants_1.PROVIDER_NAMES.INJECTED;
        return undefined;
    })();
    return {
        providerName: providerName,
        isConnectedViaWagmi: isConnectedViaWagmi,
        isGnosis: isGnosis,
        isLedger: isLedger,
        isLedgerLive: isLedgerLive,
        isWalletLink: isWalletLink,
        isCoinbase: isCoinbase,
        isMetamask: isMetamask,
        isImToken: isImToken,
        isTrust: isTrust,
        isXdefi: isXdefi,
        isDappBrowser: isDappBrowser,
        isInjected: isInjected,
    };
};
exports.useConnectorInfo = useConnectorInfo;
