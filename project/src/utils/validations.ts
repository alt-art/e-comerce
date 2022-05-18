import * as yup from 'yup';
import zxcvbn from 'zxcvbn';

export const schemaUserSingUp = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(3).required(),
  password: yup
    .string()
    .max(150)
    .test({
      name: 'password-test',
      test: (value = '') => {
        const result = zxcvbn(value);
        if (value === '') {
          throw new Error('password is a required field');
        }
        if (result.score <= 2) {
          throw new Error(
            result.feedback.warning || 'Your password is too weak',
          );
        }
        return true;
      },
    }),
});

export const schemaUserLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
