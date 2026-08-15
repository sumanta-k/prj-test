import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';

const healthCheckController = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: 'health check is ok' },
        "ding dong it's working"
      )
    );
});
export { healthCheckController };
