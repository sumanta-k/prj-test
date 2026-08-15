import { ApiResponse } from '../utils/api-response.js';

const healthCheckController = async (req, res, next) => {
  try {
    await getUserFromDB(); // calling db to get user
    res
      .status(200)
      .json(new ApiResponse(200, { data: 'health check is running' }));
  } catch (err) {
    next(err); //handling errors by express given error handler
  }
};

export { healthCheckController };
