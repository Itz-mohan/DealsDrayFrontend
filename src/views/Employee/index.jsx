import React from 'react';
import { useNavigate } from 'react-router-dom';

//Mui
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Components
import CustomTable from '../../components/Table';

//Apis
import useApis from '../../apis/useApis';

//Helpers
import useDebounce from '../../helpers/useDebounce';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@mui/material';
import InputField from '../../components/TextField';

const heading = [
  'Unique Id',
  'Image',
  'Name',
  'Email',
  'Mobile No',
  'Designation',
  'gender',
  'Course',
  'Create date',
  'status',
  'Action',
];

export default function Employee() {
  const { GetEmployee, SearchEmployee, Deactivate, DeleteEmployee } = useApis();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const searchDebounce = useDebounce(searchValue);
  const [count, setCount] = React.useState(0);
  const [offset, setOffset] = React.useState(1);

  React.useEffect(() => {
    GetEmployees();
  }, [offset]);

  // handling Search & Filter Apis
  React.useEffect(() => {
    if (searchDebounce && searchDebounce.length > 0) {
      handleSearch();
    } else {
      GetEmployees();
    }
  }, [searchDebounce]);

  //Get all employees
  const GetEmployees = async () => {
    try {
      let value = {
        offset: (offset - 1) * 10,
        limit: 10,
      };

      const data = await GetEmployee(value);

      if (data?.status === 200) {
        setData(data?.data?.data);
        setCount(data?.data?.count);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  //handle search Api Func
  const handleSearch = async () => {
    try {
      let value = {
        search: searchValue,
      };

      const data = await SearchEmployee(value);

      if (data?.status === 200) {
        setData(data?.data?.data);
        setCount(data?.data?.count);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleDeactivate = async (id, status) => {
    try {
      let value = {
        id: id,
        status: status === true ? false : true,
      };

      let deactivate = await Deactivate(value);

      if (deactivate.status === 200) {
        GetEmployees();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleDelete = async (id) => {
    try {
      let value = {
        id: id,
      };

      let del = await DeleteEmployee(value);

      if (del.status === 200) {
        GetEmployees();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  //handle searchValue Func
  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  //handle pagination Func
  const handlePagination = (value) => {
    setOffset(value);
  };

  const bufferData = (imageBuffer, type) => {
    // Convert the buffer to a Blob
    const blob = new Blob([imageBuffer], { type: type });

    // Create a data URL from the Blob
    const imageUrl = URL.createObjectURL(blob);

    // const base64Image = Buffer.from(imageBuffer).toString('base64');
    // const imageSrc = `data:image/jpeg;base64,${base64Image}`;

    return (
      <div>
        <img src={imageUrl} alt='Image' />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div style={{ margin: '25px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '25%', height: '30px' }}>
            <InputField
              variant={`outlined`}
              type={`text`}
              value={searchValue}
              placeholder={`Search by Email`}
              handleChange={handleSearchValue}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {'Total Count :'}
            </span>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {count}
            </span>
          </div>
          <div>
            <Button
              style={{
                background: '#081a53',
                borderRadius: '5px',
                width: '181px',
                height: '40px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/employee/create-employee')}
            >
              <Typography
                style={{
                  textTransform: 'uppercase',
                  fontSize: '15px',
                  color: '#ffffff',
                }}
              >
                ADD EMPLOYEE
              </Typography>
            </Button>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <CustomTable
            heading={heading}
            data={
              data &&
              data?.length > 0 &&
              data?.map((e, i) => {
                return [
                  e['id'],
                  [
                    bufferData(
                      e['FileManagement.file'],
                      e['FileManagement.file_type']
                    ),
                  ],
                  e['name'],
                  e['email'],
                  e['mobile'],
                  e['designation'],
                  e['gender'],
                  e['course'],
                  e['createdAt'],
                  [
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={e['isActive'] === true ? true : false}
                            onClick={() =>
                              handleDeactivate(e['id'], e['isActive'])
                            }
                          />
                        }
                      />
                    </FormGroup>,
                  ],
                  [
                    <div>
                      <EditIcon
                        onClick={() =>
                          navigate(`/employee/edit-employee?id=${e['id']}`)
                        }
                      />
                      <DeleteIcon onClick={() => handleDelete(e['id'])} />
                    </div>,
                  ],
                ];
              })
            }
            offset={offset}
            count={
              (count / 10) % 1 == 0
                ? Math.floor(count / 10)
                : Math.floor(count / 10 + 1)
            }
            handlePagination={handlePagination}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
