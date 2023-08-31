import React from 'react';
import Form from '../../components/Form';
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useApis from '../../apis/useApis';
import useForm from '../../helpers/useForm';
import { EmployeeValidation } from '../../helpers/validateRules';

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

export default function EditEmployee() {
  const { GetEmployeeById, UpsertEmployee } = useApis();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParamValue = queryParams.get('id');

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    EmployeeValidation
  );

  const [file, setFile] = React.useState('');
  const [fileType, setFileType] = React.useState('');

  React.useEffect(() => {
    if (queryParamValue && queryParamValue.length > 0) {
      Getemployee(queryParamValue);
    }
  }, [queryParamValue]);

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
      formData.append('id', queryParamValue);

      let edit = await UpsertEmployee(formData);

      if (edit.status === 200) {
        navigate('/employee');
      }
    } catch (err) {
      console.log({ err });
    }
  }

  const Getemployee = async (id) => {
    try {
      let value = { id };
      let get = await GetEmployeeById(value);

      if (get.status === 200) {
        handleChange({ name: 'name', value: get.data.data.name });
        handleChange({ name: 'email', value: get.data.data.email });
        handleChange({ name: 'mobile', value: get.data.data.mobile });
        handleChange({ name: 'designation', value: get.data.data.designation });
        handleChange({ name: 'gender', value: get.data.data.gender });
        handleChange({ name: 'course', value: get.data.data.course });
        handleChange({
          name: 'img',
          value: get.data.data['FileManagement.file_name'],
        });
        setFile(get.data.data['FileManagement.file']);
        setFileType(get.data.data['FileManagement.file_type']);
      }
    } catch (err) {
      console.log({ err });
    }
  };
  console.log({ values });
  return (
    <div>
      <div style={{ padding: '20px 20px' }}>
        <div>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Edit Employee</p>
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
    </div>
  );
}
