import {  models, requests } from "oci-generativeaiinference";
import client from "../utils/ociClient"; // your GenerativeAiInferenceClient
import config from "../config/oci.config";
import { NoRetryConfigurationDetails } from "oci-common"; // optional if you want retries disabled
// import { GenericChatResponse } from "oci-generativeaiinference/lib/model";
// import logger from "./logger"; // assuming you have a logger

interface GenericChatResponse {
  apiFormat: string;
  timeCreated: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: Array<{
        type: string;
        text: string;
      }>;
      toolCalls: any[];
    };
    finishReason: string;
    logprobs: any;
  }>;
  usage: {
    completionTokens: number;
    promptTokens: number;
    totalTokens: number;
  };
}

export const generateResponse = async (prompt :string): Promise<string | undefined> => {
  try {


    // Build prompt
    // const prompt ='say joke on programing';

    // Model + serving mode
    const modelId = "ocid1.generativeaimodel.oc1.us-chicago-1.amaaaaaask7dceyajqi26fkxly6qje5ysvezzrypapl7ujdnqfjq6hzo2loq"; // move OCID into config
    const servingMode: models.OnDemandServingMode = {
      modelId,
      servingType: "ON_DEMAND",
    };

    // Build request
    const chatRequest: requests.ChatRequest = {
      chatDetails: {
        compartmentId: config.OCI_COMPARTMENT_ID,
        servingMode,
        chatRequest: {
          messages: [
            {
              role: "USER",
              content: [
                {
                  type: "TEXT",
                  //@ts-ignore
                  text: prompt,
                },
              ],
            },
          ],
          apiFormat: "GENERIC",
          maxTokens: 600,
          temperature: 0.7,
          frequencyPenalty: 0,
          presencePenalty: 0,
          topP: 0.75,
          topK: -1,
        },
      },
      retryConfiguration: NoRetryConfigurationDetails, // disables retry
    };

    // Call OCI
    const chatResponse = await client.chat(chatRequest);

    // logger.info("************************** Chat Response **************************");

    // Extract result
    if (chatResponse && "chatResult" in chatResponse) {
      const result = chatResponse.chatResult;

      if (result.chatResponse?.apiFormat === "GENERIC") {
        const parsed = result.chatResponse as unknown as GenericChatResponse;

        const messageContent =
          parsed.choices?.[0]?.message?.content?.[0]?.text ?? "";

        if (messageContent) {
          return messageContent;
        } else {
          console.log("⚠️ AI response received but no text content found.");
        }
      } else {
        console.log("⚠️ Unexpected chatResponse format.");
      }
    } else {
      console.log("⚠️ No chatResult found in response.");
    }

    return undefined;
  } catch (error) {
    console.log("❌ AI processing error:", error);
    throw new Error("Failed to generate AI response.");
  }
};
