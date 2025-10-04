import { Request, Response} from 'express'
import { generateResponse } from "../services/aiTasks.service";

export const generateHashtages = async (req: Request, res: Response) => {
      const { transcription } = req.body
  const prompt = `
You are an expert social media manager and content strategist. 
I am providing a video transcription with timestamps in JSON format. 
Your task is to generate a list of **highly relevant, trending, and engaging hashtags** 
that maximize reach on platforms like Instagram, YouTube, and TikTok.

Rules:
- The transcription is provided as a JSON array under the key "transcription".
- Each item has "start", "end", and "text".
- Ignore timestamps; focus only on the textual content.
- Suggest **10–15 hashtags** that are highly relevant to the main topics, trends, and themes of the video.
- Hashtags should be concise, easy to read, and without spaces.
- Include a mix of **topic-specific**, **general popular**, and **trend-focused** hashtags.
- Avoid generic or spammy hashtags like #video, #content, #fun.
- give array of hashtags in plain text without any other text.

Transcription JSON:
${JSON.stringify(transcription, null, 2)}
`;


  const hashtags = await generateResponse(prompt)

  console.log(hashtags)

  if (hashtags) {
    res.status(200).json({
      success: true,
      data: hashtags,
      message: "Hashtags generated successfully"
    })
  } else {
    res.status(500).json({
      success: false,
      data: null,
      message: "Hashtags generation failed"
    })
  }
}