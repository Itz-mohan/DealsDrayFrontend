import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import useForm from '../../helpers/useForm';
import { EmployeeValidation } from '../../helpers/validateRules';
import { Button, Typography } from '@mui/material';
import useApis from '../../apis/useApis';

const initialValues = {
  name: '',
  img: '',
  email: '',
  mobile: '',
  designation: '',
  gender: '',
  course: '',
};

const designation = [
  {
    label: 'HR',
    value: 'hr',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Sales',
    value: 'sales',
  },
];

const gender = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

const course = [
  {
    label: 'MCA',
    value: 'mca',
  },
  {
    label: 'BCA',
    value: 'bca',
  },
  {
    label: 'BSC',
    value: 'bsc',
  },
];

export default function CreateEmployee() {
  const { UpsertEmployee } = useApis();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    EmployeeValidation
  );

  const [file, setFile] = React.useState('');
  const [fileType, setFileType] = React.useState('');

  async function handleSubmitCB(values) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', fileType);
      formData.append('img', values.img);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('mobile', values.mobile);
      formData.append('designation', values.designation);
      formData.append('course', values.course);
      formData.append('gender', values.gender);

      let create = await UpsertEmployee(formData);

      if (create.status === 200) {
        navigate('/employee');
      }
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div style={{ padding: '20px 20px' }}>
      <div>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Create Employee</p>
      </div>
      <Form
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        designation={designation}
        gender={gender}
        course={course}
        file={file}
        setFile={setFile}
        fileType={fileType}
        setFileType={setFileType}
      />
      <div style={{ paddingTop: '20px' }}>
        <Button
          style={{
            // background: '#081a53',
            borderRadius: '5px',
            width: '181px',
            height: '40px',
          }}
          onClick={() => navigate('/employee')}
        >
          <Typography
            style={{
              textTransform: 'uppercase',
              fontSize: '15px',
              color: '#081a53',
            }}
          >
            CANCEL
          </Typography>
        </Button>
        <Button
          style={{
            background: '#081a53',
            borderRadius: '5px',
            width: '181px',
            height: '40px',
          }}
          onClick={handleSubmit}
        >
          <Typography
            style={{
              textTransform: 'uppercase',
              fontSize: '15px',
              color: '#ffffff',
            }}
          >
            submit
          </Typography>
        </Button>
      </div>
    </div>
  );
}
