import { User } from '../model/user.model.js'; // for checking user exists in db or not
import { ApiResponse } from '../utils/api-response.js'; // to send response to users
import { ApiError } from '../utils/api-error.js'; // to send error to users
import { asyncHandler } from '../utils/async-handler.js'; // to handle request asynchronously
import { sendEmail, userVerificationMailgenContent } from '../utils/mail.js';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      'something went wrong while generating access token'
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, role } = req.body;

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(
      409,
      'user is already existed with this username or email',
      []
    );
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: 'verify your email',
    mailgenContent: userVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unHashedToken}`
    )
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  if (!createdUser) {
    throw new ApiError(500, 'something went wrong while registering user');
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        'user registered successfully and verification email has been sent on your email'
      )
    );
});

export { registerUser };
