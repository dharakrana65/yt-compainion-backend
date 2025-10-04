import { GenerativeAiClient } from "oci-generativeai";
import { ConfigFileAuthenticationDetailsProvider } from "oci-common";
import config from '../config/oci.config'

const provider = new ConfigFileAuthenticationDetailsProvider(
    config.OCI_CONFIG_LOCATION,
    config.OCI_CONFIG_PROFILE
);

const client = new GenerativeAiClient({
    authenticationDetailsProvider: provider
});

export default client;