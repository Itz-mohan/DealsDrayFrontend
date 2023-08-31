// custom pages
import Auth from '../views/Auth';
import Dashboard from '../views/Dashboard';
import Employee from '../views/Employee';
import CreateEmployee from '../views/Employee/create';
import EditEmployee from '../views/Employee/edit';

var indexRoutes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/employee', name: 'Employee', component: Employee },
  {
    path: '/employee/create-employee',
    name: 'CreateEmployee',
    component: CreateEmployee,
  },
  {
    path: '/employee/edit-employee',
    name: 'EditEmployee',
    component: EditEmployee,
  },
  { path: '/', name: 'Auth', component: Auth },
];

export default indexRoutes;
