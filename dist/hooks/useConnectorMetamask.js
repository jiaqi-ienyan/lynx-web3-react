"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectorMetamask = void 0;
var invariant = require("tiny-invariant");
var warning = require("tiny-warning");
var react_1 = require("react");
var useConnectors_1 = require("./useConnectors");
var useWeb3_1 = require("./useWeb3");
var helpers_1 = require("../helpers");
var useDisconnect_1 = require("./useDisconnect");
var WALLET_URL = 'https://metamask.app.link/dapp/';
var useConnectorMetamask = function (args) {
    var injected = (0, useConnectors_1.useConnectors)().injected;
    var activate = (0, useWeb3_1.useWeb3)().activate;
    var disconnect = (0, useDisconnect_1.useForceDisconnect)().disconnect;
    var onConnect = args === null || args === void 0 ? void 0 : args.onConnect;
    var openInWallet = (0, react_1.useCallback)(function () {
        try {
            var _a = window.location, host = _a.host, pathname = _a.pathname, search = _a.search;
            var pageUrlWithoutProtocol = encodeURI(host + pathname + search);
            (0, helpers_1.openWindow)("".concat(WALLET_URL).concat(pageUrlWithoutProtocol));
        }
        catch (error) {
            warning(false, 'Failed to open the link');
        }
    }, []);
    var connect = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invariant(injected, 'Connector is required');
                    return [4 /*yield*/, (0, helpers_1.checkIfBraveBrowser)()];
                case 1:
                    // Brave Wallet mimics MetaMask.
                    // If a user has the Brave Browser without the MetaMask extension we want
                    // to redirect the user to the MetaMask website.
                    // If MetaMask is installed, the isBraveWallet property will be false.
                    if ((_a.sent()) && (0, helpers_1.isBraveWalletProvider)()) {
                        openInWallet();
                        return [2 /*return*/];
                    }
                    if (!(0, helpers_1.hasInjected)()) return [3 /*break*/, 4];
                    return [4 /*yield*/, disconnect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, activate(injected)];
                case 3:
                    _a.sent();
                    onConnect === null || onConnect === void 0 ? void 0 : onConnect();
                    return [3 /*break*/, 5];
                case 4:
                    openInWallet();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [injected, openInWallet, disconnect, activate, onConnect]);
    return { connect: connect, connector: injected };
};
exports.useConnectorMetamask = useConnectorMetamask;
