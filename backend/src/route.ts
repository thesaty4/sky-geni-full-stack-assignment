import { Router } from "express";
import customerRoute from "./routes/chartInfo.route";

const router = Router();

router.use("/customer-type", customerRoute);

export default router;
