import { useContext } from 'react';
import { ConnectorsContext } from '../context/connectors.js';

var useConnectors = () => {
  return useContext(ConnectorsContext);
};

export { useConnectors };
