import "../../App.css";
import notificationicon from "../../images/notification.png";
import axios from "axios";
import React, { useEffect, useState } from "react";
import pb from "../../images/pendingbudgets.svg";
import pt from "../../images/pendingtickets.svg";
import userimg from "../../images/user.svg";

import Box from "./Box";
import BoxTable from "./BoxTable";
import BoxManager from "./BoxManager";
import ProgressBox from "./BoxProgress";
import BoxThird from "./BoxThird";
import BuyerManagersList from "../../views/buyer/buyerManagers";

const BuyerDashboard = ({ userId }) => {
  const numRowsToShow = 6;
  const someUserId = userId;
  const idBuyer = userId;
  const idUser = userId;

  const pendingBudgets = BuyerPendingBudgets(idUser);
  const activeLicenses = BuyerActiveLicenses(idUser);
  const linkedUsers = BuyerLicenses(idUser);
  const rows = useTablePendingBudgets(idUser);
  //const nameProduct = FillMostUsedTable();


  return (
    <div>
      <div className="bg-light w-100">
        <h2 className="title py-3">Dashboard</h2>
        <div className="col-12 text-center">
          <div className="row">
          <div className="col">
              <Box
                title="Pending budgets"
                number={pendingBudgets}
                image={pb}
              />
            </div>
            <div className="col">
              <Box
                title="Active Licenses"
                number={activeLicenses}
                image={userimg}
              />
            </div>
            <div className="col">
              <Box
                title="All Licenses"
                number={linkedUsers}
                image={userimg}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 text-center py-4">
        <div className="row">
          <div className="col-4">
            <BoxTable title="Pending budgets" rows={rows} />
          </div>
          <div className="col-4">
          <ProgressBox idUser={someUserId} />
          </div>
          <div className="col-4">
          <ManagerContainer idBuyer={idBuyer} />
          </div>
        </div>
      </div>
      <div className="col-12">
        <BoxThird numRowsToShow={numRowsToShow} />
      </div>
    </div>
  );
};

function BuyerActiveLicenses(idUser) {
  const [activeLicenses, setActiveLicenses] = useState(0);

  useEffect(() => {
    const fetchActiveLicenses = async () => {
      try {
        const url = `http://localhost:8080/licenses/status/${idUser}`;
        const res = await axios.get(url);
        if (res.status === 200) {
          const { count } = res.data; // Destructure count from res.data
          setActiveLicenses(count); // Set activeLicenses directly to count
        } else {
          console.error("Error fetching active licenses:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching active licenses:", error);
      }
    };

    fetchActiveLicenses();
  }, [idUser]);

  return activeLicenses;
}

function BuyerPendingBudgets(idUser) {
  const [pendingBudgets, setPendingBudgets] = useState(0);

  useEffect(() => {
    const fetchPendingBudgets = async () => {
      try {
        const url = `http://localhost:8080/budget/count/${idUser}`;
        const res = await axios.get(url);
        if (res.status === 200) {
          const { count } = res.data;
          setPendingBudgets(count);
        } else {
          console.error("Error fetching pending budgets:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching pending budgets:", error);
        console.log(idUser)
      }
    };

    if (idUser !== 0) {
      fetchPendingBudgets();
    }
  }, [idUser]);

  return pendingBudgets;
}


/*find buyer licenses*/
function BuyerLicenses(idUser) {
  const [linkedUsers, setLinkedUsers] = useState(0);

  useEffect(() => {
    const fetchBuyerLicenses = async () => {
      try {
        const url = `http://localhost:8080/licenses/count/${idUser}`;
        const res = await axios.get(url);
        if (res.status === 200) {
          const { count } = res.data; // Assuming the response structure is { count: 10 }
          setLinkedUsers(count); // Set linkedUsers state to the count of licenses
        } else {
          console.error("Error fetching licenses:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching licenses:", error);
      }
    };

    fetchBuyerLicenses();
  }, [idUser]);

  return linkedUsers;
}


/*preencher tabela de pending budgets*/
function useTablePendingBudgets(idUser) {
  const [tableContent, setTableContent] = useState([]);

  useEffect(() => {
    const fetchTablePendingBudgets = async () => {
      try {
        const url = `http://localhost:8080/budget/status2/user/${idUser}`;
        const res = await axios.get(url);
        if (res.status === 200) {
          const filteredBudgets = res.data.filter(
            (budget) => budget.idBudgetStatus === 1 || budget.idBudgetStatus === 2
          );
          setTableContent(filteredBudgets);
        } else {
          alert("Error Web Service!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (idUser) {
      fetchTablePendingBudgets();
    }
  }, [idUser]);

  // Split the tableContent array into rows of 3 items each
  const rows = [];
  const itemsPerRow = 1;
  for (let i = 0; i < tableContent.length; i += itemsPerRow) {
    rows.push(tableContent.slice(i, i + itemsPerRow));
  }

  return rows;
}

const ManagerContainer = ({ idBuyer }) => {
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/managers/${idBuyer}`);
        setBuyerData({ managers: response.data });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [idBuyer]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <BoxManager buyerData={buyerData} />;
};


export default BuyerDashboard;

/*preencher tabela de softwares mais usados*/
/*preencher tabela de softwares mais usados*/
/* const [sortedLicenses, setSortedLicenses] = useState([]);
  const [tableMostUsedContent, setTableMostUsedContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/license/findByBuyer/1"); 
        const filteredLicenses = response.data.filter(license => license.idBudgetStatus === 1);
        processLicenses(filteredLicenses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idCart]);

  const processLicenses = (licenses) => {  

    // Count the occurrences of each productID
    const productCounts = licenses.reduce((acc, license) => {
      acc[license.productID] = (acc[license.productID] || 0) + 1;
      return acc;
    }, {});

    // Convert to array and sort by count in descending order
    const sortedProductIDs = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([productID, count]) => ({ productID, count }));

    setSortedLicenses(sortedProductIDs);
  };

  const updatedData = sortedLicenses.map(item => ({
    nome: '{item.productID}', // Assuming 'Product' + productID as name, adjust as needed
    numeroTotal: 1000, // Replace with actual total number if available
    numeroAtivos: item.count
  }));

  setTableMostUsedContent(updatedData);

 */
