"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectors = void 0;
var react_1 = require("react");
var connectors_1 = require("../context/connectors");
var useConnectors = function () {
    return (0, react_1.useContext)(connectors_1.ConnectorsContext);
};
exports.useConnectors = useConnectors;
