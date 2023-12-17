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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var invariant = require("tiny-invariant");
var providers_1 = require("@ethersproject/providers");
var constants_1 = require("@lynx-sdk/constants");
var providers_2 = require("@lynx-sdk/providers");
var react_2 = require("@lynx-sdk/react");
var core_1 = require("@web3-react/core");
var core_react_1 = require("@reef-knot/core-react");
var wagmi_1 = require("wagmi");
var wagmiChains = require("wagmi/chains");
var index_1 = require("../hooks/index");
var constants_2 = require("../constants");
var connectors_1 = require("./connectors");
function getLibrary(provider) {
    var library = new providers_1.Web3Provider(provider);
    library.pollingInterval = constants_2.POLLING_INTERVAL;
    return library;
}
var ProviderSDK = function (props) {
    var rpc = props.rpc, defaultChainId = props.defaultChainId, supportedChainIds = props.supportedChainIds, children = props.children, _a = props.pollingInterval, pollingInterval = _a === void 0 ? constants_2.POLLING_INTERVAL : _a, rest = __rest(props, ["rpc", "defaultChainId", "supportedChainIds", "children", "pollingInterval"]);
    var _b = (0, core_1.useWeb3React)(), isConnectedViaWeb3React = _b.active, library = _b.library;
    var _c = (0, index_1.useWeb3)(), _d = _c.chainId, chainId = _d === void 0 ? defaultChainId : _d, account = _c.account, active = _c.active;
    var _e = (0, wagmi_1.useAccount)(), connectorWagmi = _e.connector, isConnectedViaWagmi = _e.isConnected;
    var _f = (0, react_1.useState)(), providerWeb3 = _f[0], setProviderWeb3 = _f[1];
    // Reset web3 provider if the provider was set previously,
    // and currently no wallet is connected via wagmi or web3-react.
    // Gets triggered on a wallet disconnection, for example.
    if (!active && providerWeb3) {
        setProviderWeb3(undefined);
    }
    // Switching providers between wagmi and web3-react.
    // This code is neither clean nor efficient, but it will be deprecated after transition to wagmi is complete.
    // useEffect is needed here because we are calling getProvider async method from wagmi,
    // which can be taken as an external API
    (0, react_1.useEffect)(function () {
        void (function () { return __awaiter(void 0, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!providerWeb3 && connectorWagmi && isConnectedViaWagmi)) return [3 /*break*/, 2];
                        return [4 /*yield*/, connectorWagmi.getProvider()];
                    case 1:
                        p = _a.sent();
                        setProviderWeb3(getLibrary(p));
                        return [3 /*break*/, 3];
                    case 2:
                        if (!providerWeb3 && library && isConnectedViaWeb3React) {
                            // Set web3-react provider
                            // Passing `library` as init value for useState does not work, but works like this:
                            setProviderWeb3(library);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    }, [connectorWagmi, isConnectedViaWagmi, isConnectedViaWeb3React, library, providerWeb3]);
    invariant(rpc[chainId], "RPC url for chain ".concat(chainId, " is not provided"));
    invariant(rpc[constants_1.CHAINS.Mainnet], 'RPC url for mainnet is not provided');
    var providerRpc = (0, providers_2.getStaticRpcBatchProvider)(chainId, rpc[chainId], 0, pollingInterval);
    var providerMainnetRpc = (0, providers_2.getStaticRpcBatchProvider)(constants_1.CHAINS.Mainnet, rpc[constants_1.CHAINS.Mainnet], 0, pollingInterval);
    return ((0, jsx_runtime_1.jsx)(react_2.ProviderSDK, __assign({ chainId: chainId, supportedChainIds: supportedChainIds, providerWeb3: providerWeb3, providerRpc: providerRpc, providerMainnetRpc: providerMainnetRpc, account: account !== null && account !== void 0 ? account : undefined }, rest, { children: children })));
};
var ProviderWeb3 = function (props) {
    var children = props.children, rpc = props.rpc, walletconnectProjectId = props.walletconnectProjectId, appName = props.appName, appLogoUrl = props.appLogoUrl, sdkProps = __rest(props, ["children", "rpc", "walletconnectProjectId", "appName", "appLogoUrl"]);
    var defaultChainId = props.defaultChainId, supportedChainIds = props.supportedChainIds;
    var connectorsProps = { rpc: rpc, appName: appName, appLogoUrl: appLogoUrl, defaultChainId: defaultChainId };
    var wagmiChainsArray = Object.values(__assign(__assign({}, wagmiChains), { holesky: core_react_1.holesky }));
    var supportedWagmiChains = wagmiChainsArray.filter(function (chain) { return supportedChainIds.includes(chain.id); });
    var defaultWagmiChain = wagmiChainsArray.find(function (chain) { return chain.id === defaultChainId; });
    return ((0, jsx_runtime_1.jsx)(core_1.Web3ReactProvider, { getLibrary: getLibrary, children: (0, jsx_runtime_1.jsx)(ProviderSDK, __assign({ rpc: rpc }, sdkProps, { children: (0, jsx_runtime_1.jsx)(core_react_1.ReefKnot, { rpc: rpc, walletconnectProjectId: walletconnectProjectId, chains: supportedWagmiChains, defaultChain: defaultWagmiChain, children: (0, jsx_runtime_1.jsx)(connectors_1.default, __assign({}, connectorsProps, { children: children })) }) })) }));
};
exports.default = (0, react_1.memo)(ProviderWeb3);
