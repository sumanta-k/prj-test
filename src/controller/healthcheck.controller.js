import { ApiResponse } from '../utils/api-response.js';

const healthCheckController = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { data: 'health check is running' }));
  } catch (err) {}
};

export { healthCheckController };
