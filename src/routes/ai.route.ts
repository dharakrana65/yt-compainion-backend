import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../middlewares/multer.middlerware";
import { exec, spawn } from 'child_process'
import { generateKey } from "crypto";
import { generateResponse } from "../services/aiTasks.service";
const router = Router()

router.post('/upload', upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  console.log(`file name : ${file?.filename}`);
  console.log(`file size : ${file?.size}`);
  console.log(`file path : ${file?.destination}`)
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully.');
});
const pythonPath = 'E:\\Dharak-whisper-model\\whisper\\venv\\Scripts\\python.exe';
const scriptPath = 'E:\\Dharak-whisper-model\\whisper\\stt.py';
const filePath = "E:\\Dharak-whisper-model\\whisper\\modi.mp4";
const language = "en";
router.get("/transcription", (req: Request, res: Response, next: NextFunction) => {
  // headers for streaming
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.flushHeaders(); // flush headers immediately

  res.write("Python process started\n");
  res.write(" ".repeat(1024) + "\n"); // 1 KB padding

  const pythonProcess = spawn(pythonPath, [scriptPath, filePath, language]);

  pythonProcess.stdout.on("data", (data) => {
    res.write(data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python stderr:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    res.write(`Python process exited with code ${code}\n`);
    res.end();
  });
});

router.post("/summary", async (req: Request, res: Response, next: NextFunction) => {
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
})

router.post("/hashtags", async (req: Request, res: Response, next: NextFunction) => {
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
})


export default router