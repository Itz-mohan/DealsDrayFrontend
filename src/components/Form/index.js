import React from 'react';

//Mui
import { Grid } from '@mui/material';
import InputField from '../TextField';
import SelectField from '../Dropdown';
import RadioField from '../RadioField';
import CheckboxField from '../Checkbox';
import UploadField from '../FileUpload';

export default function Form(props) {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    designation,
    gender,
    course,
    file,
    setFile,
    fileType,
    setFileType,
  } = props;

  return (
    <Grid container spacing={2} maxWidth='md'>
      <Grid item xs={12} sm={6}>
        <InputField
          required={true}
          variant={`outlined`}
          type={`text`}
          label={`First Name`}
          value={values.name}
          error={errors.name}
          handleChange={(e) => {
            handleChange({ name: 'name', value: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          required={true}
          variant={`outlined`}
          type={`text`}
          label={`Email`}
          value={values.email}
          error={errors.email}
          handleChange={(e) => {
            handleChange({ name: 'email', value: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          required={true}
          variant={`outlined`}
          type={`number`}
          label={`Mobile`}
          value={values.mobile}
          error={errors.mobile}
          handleChange={(e) => {
            handleChange({ name: 'mobile', value: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField
          required={true}
          label={`Designation`}
          value={values.designation}
          error={errors.designation}
          handleChange={(e) => {
            handleChange({ name: 'designation', value: e.target.value });
          }}
          options={designation}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RadioField
          row={true}
          label={`Gender`}
          value={values.gender}
          error={errors.gender}
          handleChange={(e) => {
            handleChange({ name: 'gender', value: e.target.value });
          }}
          options={gender}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CheckboxField
          label={`Course`}
          value={values.course}
          error={errors.course}
          handleChange={(e) => {
            handleChange({ name: 'course', value: e });
          }}
          options={course}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <UploadField
          id={'upload-file'}
          required={true}
          variant={`outlined`}
          type={`file`}
          label={`Upload`}
          value={values.img}
          error={errors.img}
          accept={'image/jpg, image/png'}
          handleChange={(event) => {
            var fileName = event.target.files?.[0].name;
            var file = event.target.files?.[0];
            var type = event.target.files?.[0].type;

            let reader = new FileReader();
            reader.onloadend = () => {};
            reader.readAsDataURL(file);

            setFile(file);
            setFileType(type);
            handleChange({ name: 'img', value: fileName });
          }}
        />
      </Grid>
    </Grid>
  );
}
