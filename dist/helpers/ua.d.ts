/// <reference types="ua-parser-js" />
export declare const device: import("ua-parser-js").IDevice;
export declare const browser: import("ua-parser-js").IBrowser;
export declare const os: import("ua-parser-js").IOS;
export declare const isIOS: boolean;
export declare const isAndroid: boolean;
export declare const isMobile: boolean;
export declare const isTablet: boolean;
export declare const isMobileOrTablet: boolean;
export declare const isFirefox: boolean;
export declare const isEdge: boolean;
export declare const checkIfBraveBrowser: () => Promise<boolean>;
