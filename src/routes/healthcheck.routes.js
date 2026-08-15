import express from 'express';
import { healthCheckController } from '../controller/healthcheck.controller.js';

const healthCheckRouter = express.Router();

router.route('/').get(healthCheckController);

export { healthCheckRouter };
