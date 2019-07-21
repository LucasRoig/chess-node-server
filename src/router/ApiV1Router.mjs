import express from 'express';
import {AuthController} from "../controllers";
let router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from api");
});

router.post("/signup", AuthController.signup);

export default router;