import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../middlewares/multer.middlerware";
import { exec, spawn } from 'child_process'
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
router.get("/transcription", (req: Request, res:Response,next: NextFunction) => {
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


export default router