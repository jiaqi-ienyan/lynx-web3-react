import { useLocalStorage } from '@lynx-sdk/react';
import { STORAGE_CONNECTOR_KEY } from '../constants/storage.js';
import '../constants/connectors.js';

var useConnectorStorage = () => useLocalStorage(STORAGE_CONNECTOR_KEY, null);

export { useConnectorStorage };
