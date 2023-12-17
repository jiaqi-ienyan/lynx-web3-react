"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptLedgerError = exports.LedgerErrorsDict = void 0;
exports.LedgerErrorsDict = {
    TransportOpenUserCancelled: 'The connection attempt has been rejected.',
    TransportStatusError: 'Make sure the device is connected and the Ethereum app is open on the device.',
    InvalidStateError: 'Make sure the device is connected and the Ethereum app is open on the device.',
    LockedDeviceError: 'The device is locked. Please, unlock it and try again.',
    TransportError: undefined,
};
var interceptLedgerError = function (error) {
    if (Object.hasOwn(exports.LedgerErrorsDict, error.name)) {
        return new Error(exports.LedgerErrorsDict[error.name]);
    }
    return error;
};
exports.interceptLedgerError = interceptLedgerError;
