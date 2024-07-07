// App.js
import React, { useContext } from 'react';
import BuyerDashboard from './components/buyer/Dashboard';
import Login from "./views/All/login";
import AdminMenu from "./views/admin/adminMenu";
import BuyerMenu from "./views/buyer/buyerMenu";
import ManagerMenu from "./views/manager/managerMenu";
import Menu from "./views/All/menu";
import { UserContext } from '../src/views/All/UserContext';

function App() {
  const { userRole, userId } = useContext(UserContext);

  // Function to render menu based on user role
  const renderMenu = () => {
    switch (userRole) {
      case "admin":
        return <AdminMenu userId={userId} />;
      case "buyer":
        return <BuyerMenu userId={userId} />;
      case "manager":
        return <ManagerMenu userId={userId} />;
      default:
        return <Menu />;
    }
  };

  return (
    <div>
      {/* Render the appropriate menu based on user role */}
      {/*renderMenu()*/}
      <AdminMenu />
    </div>
  );
}

export default App;
