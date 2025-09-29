import { Router } from "express";
import aiRoutes from "./ai.route";
const router = Router()

router.use('/api',aiRoutes);

export default router;