import { Router } from "express";
import {
  createHub, listHubs, getHub, connectHubs, disconnectHubs, getGraph
} from "../controllers/hubController.js";

const router = Router();

router.get("/", listHubs);
router.post("/", createHub);
router.get("/graph", getGraph);
router.post("/connect", connectHubs);
router.post("/disconnect", disconnectHubs);
router.get("/:hubId", getHub);

export default router;
