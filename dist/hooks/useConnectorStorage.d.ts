/// <reference types="react" />
import { ConnectorsContextValue } from '../context';
export declare const useConnectorStorage: () => [storedValue: keyof ConnectorsContextValue | null, setValue: import("react").Dispatch<import("react").SetStateAction<keyof ConnectorsContextValue | null>>];
