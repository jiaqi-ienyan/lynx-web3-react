"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectorStorage = void 0;
var react_1 = require("@lynx-sdk/react");
var constants_1 = require("../constants");
var useConnectorStorage = function () {
    return (0, react_1.useLocalStorage)(constants_1.STORAGE_CONNECTOR_KEY, null);
};
exports.useConnectorStorage = useConnectorStorage;
