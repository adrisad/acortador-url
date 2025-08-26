import { Router } from "express";
import { UrlController } from "../controller/url.controller.js";

const router = Router();
const controller = new UrlController();

router.post("/urls", controller.create.bind(controller));
router.get("/:code", controller.resolve.bind(controller));

export default router;
