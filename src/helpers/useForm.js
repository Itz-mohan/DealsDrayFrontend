import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const useForm = (initialValues, callback, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) callback(values);
    // eslint-disable-next-line
  }, [errors]);

  const handleSubmit = useCallback(() => {
    setErrors(false);
    if (validate !== undefined && validate) setErrors(validate(values));
    setIsSubmitting(true);
  }, [values]);

  //Temp
  const handleSubmitCustom = useCallback(() => {
    setErrors(false);
    let customValues = values;
    if (customValues) {
      customValues = {
        ...customValues,
        phoneNumber: (values?.phoneNumber || '').replace(/[() -]/g, ''),
        landLine: (values?.landLine || '').replace(/[() -]/g, ''),
      };
    }
    if (validate !== undefined && validate) setErrors(validate(customValues));
    setIsSubmitting(true);
  }, [values]);

  const checkError = useCallback(
    () => {
      setErrors(false);
      if (validate !== undefined && validate) setErrors(validate(values));
      setIsSubmitting(false);
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [values]
  );

  const handleCurrentVal = (obj) => {
    setValues(obj);
  };

  const handleSwitchButton = useCallback((field, value) => {
    setValues((values) => ({
      ...values,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback((initialValues) => {
    setIsSubmitting(false);
    setErrors({});
    setValues(initialValues);
    // eslint-disable-next-line
  }, []);

  const setUpdateValue = useCallback((field, value) => {
    setValues((values) => ({
      ...values,
      [field]: value,
    }));
  }, []);

  const handleChange = useCallback((e) => {
    setValues((values) => ({
      ...values,
      [e.name]: e.value,
    }));
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (!/^\d{1,10}(\.\d{0,4})?$/.test(e.target.value)) {
        e.persist();
        return null;
      }
      let thisName = e.target.name;
      let thisValue = e.target.value;
      setValues((values) => ({
        ...values,
        [thisName]: thisValue,
      }));
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [values]
  );

  const handleDateChange = useCallback((date, name = 'date') => {
    date = new Date(date);
    let value = date.getTime();
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
    // eslint-disable-next-line
  }, []);

  const handleDateTimeChange = useCallback((date, name = 'datetime') => {
    setValues((values) => ({
      ...values,
      [name]: date,
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = useCallback((e, name = 'select') => {
    let value = e ? e.target.value : null;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
    // eslint-disable-next-line
  }, []);

  const handleRadioChange = useCallback((e) => {
    let value = e.target.value;
    let name = e.target.name;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
    // eslint-disable-next-line
  }, []);

  const handleMultiSelectChange = useCallback((e, name = 'mselect') => {
    let itemIds = [];
    if (e !== null && e.length > 0) {
      e.forEach((item) => {
        itemIds.push(item.value);
      });
    }

    setValues((values) => ({
      ...values,
      [name]: itemIds,
      [name + 'Label']: e,
    }));

    // eslint-disable-next-line
  }, []);

  const handleCheckboxChange = useCallback((value, name = 'checkbox') => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
    // eslint-disable-next-line
  }, []);

  const handleFileChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.files[0],
    }));
    // eslint-disable-next-line
  }, []);

  // triggers when file is dropped
  const uploadHandleDrop = function (e) {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const type = e.dataTransfer.files[0]['type'];
      const fileName = e.dataTransfer.files[0]['name'];
      // if(type == "image/jpeg" || type == "image/png" || type == "image/gif") {
      if (
        type == 'application/pdf' ||
        type == 'image/jpeg' ||
        type == 'image/png' ||
        type == 'image/gif'
      ) {
        handleChange({ name: 'fileName', value: fileName });
        handleChange({ name: 'fileType', value: type });
        toast.success('file uploaded successfully');
        console.log(e.dataTransfer.files);
      } else {
        handleChange({ name: 'fileType', value: '' });
        handleChange({ name: 'fileName', value: '' });
        toast.warn('file upload not supported...');
      }
    }
  };

  // triggers when file is selected with click
  const uploadHandleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const type = e.target.files[0]['type'];
      const fileName = e.target.files[0]['name'];

      // if(type == "image/jpeg" || type == "image/png" || type == "image/gif") {
      if (
        type == 'application/pdf' ||
        type == 'image/jpeg' ||
        type == 'image/png' ||
        type == 'image/gif'
      ) {
        handleChange({ name: 'fileName', value: fileName });
        toast.success('file uploaded successfully');
        let reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files);
        console.log(reader.readAsDataURL(e.target.files[0]));
      } else {
        handleChange({ name: 'fileName', value: '' });
        toast.warn('file upload not supported...');
      }
    }
  };

  return {
    handleChange,
    handleDateChange,
    handleDateTimeChange,
    handleSelectChange,
    handleKeyPress,
    handleMultiSelectChange,
    handleSubmit,
    handleSubmitCustom,
    values,
    setUpdateValue,
    errors,
    resetForm,
    handleCurrentVal,
    handleCheckboxChange,
    handleFileChange,
    handleRadioChange,
    handleSwitchButton,
    checkError,
    uploadHandleChange,
    uploadHandleDrop,
  };
};

export default useForm;
