import React, { useContext } from 'react';
import { UserContext } from './views/All/UserContext';
import AdminMenu from './views/admin/adminMenu';
import BuyerMenu from './views/buyer/buyerMenu';
import ManagerMenu from './views/manager/managerMenu';
import Menu from './views/All/menu';

function App() {
  const { user } = useContext(UserContext);
  const { userRole, userId } = user;

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
      {renderMenu()}
    </div>
  );
}

export default App;
