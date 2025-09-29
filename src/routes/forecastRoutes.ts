import { Router } from "express";
import * as controller from "../controllers/forecastController";

const router = Router();

router.get("/info", controller.list);
router.get("/info/:id", controller.get);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/remove/:id", controller.remove);

export default router;
