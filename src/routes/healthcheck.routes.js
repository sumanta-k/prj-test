import express from 'express';
import { healthCheckController } from '../controller/healthcheck.controller.js';

const healthCheckRouter = express.Router();

healthCheckRouter.route('/').get(healthCheckController);

export { healthCheckRouter };
