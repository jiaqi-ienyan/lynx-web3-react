"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectorError = void 0;
var useWeb3_1 = require("./useWeb3");
var core_react_1 = require("@reef-knot/core-react");
var helpers_1 = require("../helpers");
var useConnectorInfo_1 = require("./useConnectorInfo");
var useSupportedChains_1 = require("./useSupportedChains");
var useConnectorError = function () {
    var error = (0, useWeb3_1.useWeb3)().error;
    var isLedger = (0, useConnectorInfo_1.useConnectorInfo)().isLedger;
    var isUnsupported = (0, useSupportedChains_1.useSupportedChains)().isUnsupported;
    var supportedChains = (0, core_react_1.useReefKnotContext)().chains;
    if (!error) {
        return;
    }
    if (isUnsupported) {
        return (0, helpers_1.getUnsupportedChainError)(supportedChains);
    }
    if (isLedger) {
        return (0, helpers_1.interceptLedgerError)(error);
    }
    return error;
};
exports.useConnectorError = useConnectorError;
