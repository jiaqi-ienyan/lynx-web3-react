import { useAccount } from 'wagmi';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerHQFrameConnector, LedgerHQConnector } from '@reef-knot/ledger-connector';
import { useWeb3 } from './useWeb3.js';
import { PROVIDER_NAMES } from '../constants/connectors.js';
import { isCoinbaseProvider, isDappBrowserProvider, isMetamaskProvider, isImTokenProvider, isTrustProvider, isXdefiProvider, isZerionProvider } from '../helpers/providerDetectors.js';
import '../helpers/ua.js';

var useConnectorInfo = () => {
  var {
    active,
    connector
  } = useWeb3();
  // === WAGMI connectors BEGIN
  var {
    isConnected,
    connector: wagmiConnector
  } = useAccount();
  var isConnectedViaWagmi = isConnected && !!wagmiConnector;
  // === WAGMI connectors END
  // === WEB3-REACT connectors BEGIN
  var isGnosis = active && connector instanceof SafeAppConnector;
  var isLedgerLive = active && connector instanceof LedgerHQFrameConnector;
  var isLedger = connector instanceof LedgerHQConnector;
  // WalletLink is used by Coinbase, but it can be used by other wallets too.
  var isWalletLink = active && connector instanceof WalletLinkConnector;
  // This detection doesn't work for the connection via QR code scanning.
  var isCoinbase = active && isCoinbaseProvider();
  var isInjected =
  // check for web3-react
  active && connector instanceof InjectedConnector ||
  // check for wagmi
  isConnectedViaWagmi && wagmiConnector.id === 'injected';
  var isDappBrowser = isInjected && isDappBrowserProvider();
  var isMetamask = isInjected && isMetamaskProvider();
  var isImToken = isInjected && isImTokenProvider();
  var isTrust = isInjected && isTrustProvider();
  var isXdefi = isInjected && isXdefiProvider();
  var isZerion = isInjected && isZerionProvider();
  var providerName = (() => {
    if (isConnectedViaWagmi && wagmiConnector.name) return wagmiConnector.name;
    // Do not try to detect providerName if the app is opened in a mobile wallet dapp browser,
    // because such wallets often mimic other wallets which makes proper detection to be hard.
    // Also, if the app is opened in a mobile wallet dapp browser,
    // then we autoconnect the wallet via injected connector,
    // and we don't allow to disconnect in such case.
    // So it is easy for a user to understand which wallet app is being used for connection.
    if (isDappBrowser) return undefined;
    if (isGnosis) return PROVIDER_NAMES.GNOSIS;
    if (isLedger) return PROVIDER_NAMES.LEDGER;
    if (isLedgerLive) return PROVIDER_NAMES.LEDGER_HQ_LIVE;
    if (isImToken) return PROVIDER_NAMES.IM_TOKEN;
    if (isTrust) return PROVIDER_NAMES.TRUST;
    // Wallets which has conflicts with each other.
    // The order of wallets checks here is important.
    // Most "aggressive" wallet, which overrides other wallets, goes first.
    if (isXdefi) return PROVIDER_NAMES.XDEFI;
    if (isCoinbase) return PROVIDER_NAMES.COINBASE;
    if (isZerion) return PROVIDER_NAMES.ZERION;
    // Metamask should be last in this list because almost all EIP-1193 wallets
    // are trying to mimic Metamask by setting isMetamask = true
    if (isMetamask) return PROVIDER_NAMES.METAMASK;
    // General providers which doesn't specify what exact wallet is being used.
    // Works as a fallback.
    if (isWalletLink) return PROVIDER_NAMES.WALLET_LINK;
    if (isInjected) return PROVIDER_NAMES.INJECTED;
    return undefined;
  })();
  return {
    providerName,
    isConnectedViaWagmi,
    isGnosis,
    isLedger,
    isLedgerLive,
    isWalletLink,
    isCoinbase,
    isMetamask,
    isImToken,
    isTrust,
    isXdefi,
    isDappBrowser,
    isInjected
  };
};

export { useConnectorInfo };
