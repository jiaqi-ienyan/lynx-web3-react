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
exports.useDisconnect = exports.useForceDisconnect = void 0;
var react_1 = require("react");
var wagmi_1 = require("wagmi");
var useWeb3_1 = require("./useWeb3");
var useConnectorInfo_1 = require("./useConnectorInfo");
var useForceDisconnect = function () {
    var _a = (0, useWeb3_1.useWeb3)(), deactivate = _a.deactivate, connector = _a.connector;
    var extendedConnector = connector;
    var wagmiDisconnect = (0, wagmi_1.useDisconnect)().disconnectAsync;
    var disconnect = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // disconnect wallets connected through web3-react connectors
                    deactivate();
                    extendedConnector === null || extendedConnector === void 0 ? void 0 : extendedConnector.deactivate();
                    return [4 /*yield*/, ((_a = extendedConnector === null || extendedConnector === void 0 ? void 0 : extendedConnector.close) === null || _a === void 0 ? void 0 : _a.call(extendedConnector))];
                case 1:
                    _b.sent();
                    // disconnect wallets connected through wagmi connectors
                    return [4 /*yield*/, wagmiDisconnect()];
                case 2:
                    // disconnect wallets connected through wagmi connectors
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [deactivate, extendedConnector, wagmiDisconnect]);
    return { disconnect: disconnect };
};
exports.useForceDisconnect = useForceDisconnect;
var useDisconnect = function () {
    var active = (0, useWeb3_1.useWeb3)().active;
    var disconnect = (0, exports.useForceDisconnect)().disconnect;
    var _a = (0, useConnectorInfo_1.useConnectorInfo)(), isGnosis = _a.isGnosis, isLedgerLive = _a.isLedgerLive, isDappBrowser = _a.isDappBrowser;
    var available = active && !isGnosis && !isDappBrowser && !isLedgerLive;
    return {
        disconnect: available ? disconnect : undefined,
    };
};
exports.useDisconnect = useDisconnect;
