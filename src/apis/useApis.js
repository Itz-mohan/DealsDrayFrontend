const URL = process.env.REACT_APP_BACKEND_URL;

export default function useApis() {
  async function Login(values) {
    try {
      let obj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };

      const data = await fetch(`${URL}/login`, obj);

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  async function GetEmployee(values) {
    try {
      let obj = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const data = await fetch(
        `${URL}/employees?offset=${values.offset}&limit=${values.limit}`,
        obj
      );

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  async function SearchEmployee(values) {
    try {
      let obj = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const data = await fetch(`${URL}/search?search=${values.search}`, obj);

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  async function UpsertEmployee(values) {
    try {
      let obj = {
        method: 'POST',
        body: values,
      };

      const data = await fetch(`${URL}/upsert-employee`, obj);

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  async function GetEmployeeById(values) {
    try {
      let obj = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      const data = await fetch(`${URL}/get-employee?id=${values.id}`, obj);

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  async function Deactivate(values) {
    try {
      let obj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };

      const data = await fetch(`${URL}/status`, obj);

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  async function DeleteEmployee(values) {
    try {
      let obj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };

      const data = await fetch(`${URL}/delete`, obj);

      const status = data.status;
      const res = await data.json();

      return { status: status, data: res };
    } catch (err) {
      console.log(err);
    }
  }

  return {
    Login,
    GetEmployee,
    GetEmployeeById,
    SearchEmployee,
    UpsertEmployee,
    Deactivate,
    DeleteEmployee,
  };
}
