import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useForm from '../../helpers/useForm';
import { LoginValidation } from '../../helpers/validateRules';
import useApis from '../../apis/useApis';
import InputField from '../../components/TextField';
import { Button, Typography } from '@mui/material';

const initialValues = {
  userName: '',
  password: '',
};

export default function Auth() {
  const { Login } = useApis();

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    LoginValidation
  );

  async function handleSubmitCB(values) {
    try {
      let value = {
        userName: values.userName,
        password: values.password,
      };

      const data = await Login(value);

      if (data.status !== 200) {
        toast.error(data.data.msg, { toastId: 'logIn' });
      } else {
        sessionStorage.setItem('username', data.data.data.user_name);
        window.location.replace('/dashboard');
      }
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            maxWidth: '35%',
            width: '100%',
            height: '100vh',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              margin: '200px 20px',
              fontWeight: 'bold',
              fontSize: '22px',
              height: '50vh',
            }}
          >
            <span>Login</span>
            <div style={{ paddingTop: '50px' }}>
              <InputField
                required={true}
                variant={`outlined`}
                type={`text`}
                label={`Username`}
                value={values.userName}
                error={errors.userName}
                handleChange={(e) => {
                  handleChange({ name: 'userName', value: e.target.value });
                }}
              />
            </div>
            <div style={{ paddingTop: '20px' }}>
              <InputField
                required={true}
                variant={`outlined`}
                type={`password`}
                label={`Password`}
                value={values.password}
                error={errors.password}
                handleChange={(e) => {
                  handleChange({ name: 'password', value: e.target.value });
                }}
              />
            </div>

            <div style={{ paddingTop: '40px' }}>
              <Button
                style={{
                  background: '#081a53',
                  borderRadius: '5px',
                  width: '181px',
                  height: '40px',
                }}
                onClick={() => handleSubmit()}
              >
                <Typography
                  style={{
                    textTransform: 'uppercase',
                    fontSize: '15px',
                    color: '#ffffff',
                  }}
                >
                  Login
                </Typography>
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: '65%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <img
            src='/images/nature.jpg'
            width='400'
            height='300'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
