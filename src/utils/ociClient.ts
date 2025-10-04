import { GenerativeAiInferenceClient } from "oci-generativeaiinference";
import { ConfigFileAuthenticationDetailsProvider } from "oci-common";
import config from "../config/oci.config";

const provider = new ConfigFileAuthenticationDetailsProvider(
  config.OCI_CONFIG_LOCATION,
  config.OCI_CONFIG_PROFILE
);

const client = new GenerativeAiInferenceClient({
  authenticationDetailsProvider: provider,
});

// You must set endpoint explicitly
client.endpoint = config.ENDPOINT; 
// e.g. "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com"

export default client;
