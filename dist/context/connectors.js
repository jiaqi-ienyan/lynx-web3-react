"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorsContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var injected_connector_1 = require("@web3-react/injected-connector");
var safe_apps_web3_react_1 = require("@gnosis.pm/safe-apps-web3-react");
var react_2 = require("@lynx-sdk/react");
var ledger_connector_1 = require("@reef-knot/ledger-connector");
var useAutoConnect_1 = require("../hooks/useAutoConnect");
var constants_1 = require("../constants");
exports.ConnectorsContext = (0, react_1.createContext)({});
var ProviderConnectors = function (props) {
    var BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
    var DEFAULT_LOGO = "".concat(BASE_URL, "/apple-touch-icon.png");
    var DEFAULT_NAME = 'Lido';
    var rpc = props.rpc, children = props.children, defaultChainId = props.defaultChainId, _a = props.appName, appName = _a === void 0 ? DEFAULT_NAME : _a, _b = props.appLogoUrl, appLogoUrl = _b === void 0 ? DEFAULT_LOGO : _b;
    var supportedChainIds = (0, react_2.useSDK)().supportedChainIds;
    var connectors = (0, react_1.useMemo)(function () {
        var _a;
        return (_a = {},
            _a[constants_1.CONNECTOR_NAMES.INJECTED] = new injected_connector_1.InjectedConnector({
                supportedChainIds: supportedChainIds,
            }),
            _a[constants_1.CONNECTOR_NAMES.GNOSIS] = (function () {
                try {
                    return new safe_apps_web3_react_1.SafeAppConnector({ supportedChainIds: supportedChainIds });
                }
                catch (error) {
                    return undefined;
                }
            })(),
            _a[constants_1.CONNECTOR_NAMES.LEDGER_HQ_LIVE] = new ledger_connector_1.LedgerHQFrameConnector({
                supportedChainIds: supportedChainIds,
            }),
            _a[constants_1.CONNECTOR_NAMES.LEDGER] = new ledger_connector_1.LedgerHQConnector({
                chainId: defaultChainId,
                url: rpc[defaultChainId],
            }),
            _a);
    }, [appLogoUrl, appName, rpc, defaultChainId, supportedChainIds]);
    (0, useAutoConnect_1.useAutoConnect)(connectors);
    return (0, jsx_runtime_1.jsx)(exports.ConnectorsContext.Provider, { value: connectors, children: children });
};
exports.default = (0, react_1.memo)(ProviderConnectors);
