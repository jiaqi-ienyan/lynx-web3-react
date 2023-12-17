import { __awaiter } from 'tslib';
import { UAParser } from 'ua-parser-js';

var parser = new UAParser();
var device = parser.getDevice();
var browser = parser.getBrowser();
var os = parser.getOS();
var isIOS = os.name === 'iOS';
var isAndroid = os.name === 'Android';
var isMobile = device.type === 'mobile';
var isTablet = device.type === 'tablet';
var isMobileOrTablet = isMobile || isTablet;
var isFirefox = browser.name === 'Firefox';
var isEdge = browser.name === 'Edge';
var checkIfBraveBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
  // @ts-expect-error TS2339: Property 'brave' does not exist on type 'Navigator'.
  return (navigator === null || navigator === void 0 ? void 0 : navigator.brave) && (yield navigator === null || navigator === void 0 ? void 0 : navigator.brave.isBrave()) || false;
});

export { browser, checkIfBraveBrowser, device, isAndroid, isEdge, isFirefox, isIOS, isMobile, isMobileOrTablet, isTablet, os };
