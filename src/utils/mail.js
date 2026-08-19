import Mailgen from 'mailgen';

const userVerificationMailgenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: 'Welcome to Test Platform',
      action: {
        instructions: 'To verify your account , please click the button',
        button: {
          color: '#22BC66',
          text: 'Confirm Your Account',
          link: verificationURL
        }
      },
      outro: 'need help or have questions reply on this email'
    }
  };
};

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: 'Reset Your Password',
      action: {
        instructions: 'to rest your password , click the button',
        button: {
          color: '#333555',
          text: 'reset password',
          link: passwordResetURL
        }
      },
      outro: 'need help then mail to this email'
    }
  };
};

export { userVerificationMailgenContent, forgotPasswordMailgenContent };
