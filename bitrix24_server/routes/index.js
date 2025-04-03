import { handleOAuth } from "../controllers/authController.js";
import express from 'express';
// Fix the import to get the default export from contactRoutes.js
import contactRouter from "./contactRoutes.js";
const route = express.Router();

route.post('/auth', handleOAuth);

route.use('/contact', contactRouter);

export default route;
