import { Request, Response} from 'express'
import { generateResponse } from "../services/aiTasks.service";

export const generateSummary = async (req: Request, res: Response) => {
    const { transcription } = req.body
    const prompt = `
    You are an AI assistant. I am providing a transcription with timestamps in JSON format.
    Your task is to generate a concise summary of the conversation.
    
    Rules:
    - The transcription is provided as a JSON array under the key "transcription".
    - Each item has "start", "end", and "text".
    - Ignore timestamps and summarize only the text content.
    - Produce the summary in plain English,  8-10 sentences.
    
    Transcription JSON:
    ${JSON.stringify(transcription, null, 2)}
    `;


    const summarizedText = await generateResponse(prompt)

    console.log(summarizedText)

    if (summarizedText) {
        res.status(200).json({
            success: true,
            data: summarizedText,
            message: "Summary generated successfully"
        })
    } else {
        res.status(500).json({
            success: false,
            data: null,
            message: "Summary generation failed"
        })
    }
}