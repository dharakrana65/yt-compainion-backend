import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../middlewares/multer.middlerware";

const router = Router()

router.post('/upload', upload.single('file') ,(req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    console.log(`file name : ${file?.filename}`);
    console.log(`file size : ${file?.size}`);
    console.log(`file path : ${file?.destination}`)
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send('File uploaded successfully.');
});

export default router