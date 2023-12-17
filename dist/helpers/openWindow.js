"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openWindow = void 0;
var openWindow = function (url) {
    if (typeof window === 'undefined')
        return;
    window.open(url, '_blank', 'noopener,noreferrer');
};
exports.openWindow = openWindow;
