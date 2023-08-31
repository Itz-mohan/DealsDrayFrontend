import * as Yup from 'yup';

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError?.inner?.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

function handleErrorMeg(msg, schema) {
  try {
    schema.validateSync(msg, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

const loginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Username is required'),
  img: Yup.string().required('Upload image is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address.'),
  mobile: Yup.string().required('Mobile number is required'),
  designation: Yup.string().required('Designation is required'),
  gender: Yup.string().required('Gender is required'),
  course: Yup.string().required('Course is required'),
});

export function LoginValidation(values) {
  return handleErrorMeg(values, loginSchema);
}

export function EmployeeValidation(values) {
  return handleErrorMeg(values, EmployeeSchema);
}
