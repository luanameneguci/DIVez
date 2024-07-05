import "../../App.css";
import notificationicon from "../../images/notification.png";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Box from "./Box";
import BoxTable from "./BoxTable";
import BoxManager from "./BoxManager";
import BoxProgress from "./BoxProgress";
import BoxThird from "./BoxThird";
import BuyerManagersList from "../../views/buyer/buyerManagers";

const BuyerDashboard = () => {
  const numRowsToShow = 6;
  const buyerId = 1;

  const dataManager = useBuyerManagers();
  const pendingBudgets = useBuyerPendingBudgets();
  const activeLicenses = useBuyerActiveLicenses();
  const linkedUsers = useBuyerLicenses();
  const idUser = 6;
  const rows = useTablePendingBudgets(idUser);
  const idCart = useBuyerCart();
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
                image={notificationicon}
              />
            </div>
            <div className="col">
              <Box
                title="Active Licenses"
                number={activeLicenses}
                image={notificationicon}
              />
            </div>
            <div className="col">
              <Box
                title="All Licenses"
                number={linkedUsers}
                image={notificationicon}
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
            <BoxProgress />
          </div>
          <div className="col-4">
          <BoxManager buyerData={dataManager} />
          </div>
        </div>
      </div>
      <div className="col-12">
        <BoxThird numRowsToShow={numRowsToShow} />
      </div>
    </div>
  );
};

/* function FillMostUsedTable() {
  const [productName, setProductName] = useState("");
  async function fetchTopProducts() {
    try {
      const response = await fetch("http://localhost:8080/product/topProducts");
      const products = await response.json();
      products.forEach((product) => {
        setProductName(product.productName);
      });
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  }

  fetchTopProducts();
  console.log(productName);
  return productName;
} */

/*find buyer active licenses*/
function useBuyerActiveLicenses() {
  const [activeLicenses, setActiveLicenses] = useState(0);

  useEffect(() => {
    const fetchActiveLicenses = async () => {
      try {
        const url = "http://localhost:8080/license/findByBuyer/1";
        const res = await axios.get(url);
        if (res.status === 200) {
          const data1 = res.data;
          const activeCount = data1.filter(
            (license) => license.idLicenseStatus === 2
          ).length;
          setActiveLicenses(activeCount);
        } 
      } catch (error) 
      {}
    };

    fetchActiveLicenses();
  }, []);

  return activeLicenses;
}

/*find buyer cart*/
function useBuyerCart() {
  const [idCart, setCartId] = useState(0);

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const url = "http://localhost:8080/cart/findByBuyer/1";
        const res = await axios.get(url);
        if (res.status === 200) {
          const data2 = res.data;
          setCartId(data2.idCart);
        } else {
          alert("Error Web Service!");
        }
      } catch (error) {
       
      }
    };

    fetchCartId();
  }, []);

  return idCart;
}

/*find buyer pending budgets*/
function useBuyerPendingBudgets() {
  const idCart = useBuyerCart();
  const [pendingBudgets, setPendingBudgets] = useState(0);

  useEffect(() => {
    const fetchPendingBudgets = async () => {
      try {
        const url = "http://localhost:8080/budget/findByCart/" + idCart;
        const res = await axios.get(url);
        if (res.status === 200) {
          const data3 = res.data;

          const pendingCount = data3.filter(
            (budget) => budget.idBudgetStatus === 1
          ).length;
          setPendingBudgets(pendingCount);
        } else {
          alert("Error Web Service!");
        }
      } catch (error) {
       
      }
    };

    if (idCart !== 0) {
      fetchPendingBudgets();
    }
  }, [idCart]);

  return pendingBudgets;
}

/*find buyer licenses*/
function useBuyerLicenses() {
  const [linkedUsers, setLinkedUsers] = useState(0);

  useEffect(() => {
    const fetchBuyerLicenses = async () => {
      try {
        const url = "http://localhost:8080/license/findByBuyer/1";
        const res = await axios.get(url);
        if (res.status === 200) {
          const data4 = res.data;
          setLinkedUsers(data4.length);
        } else {
          alert("Error Web Service!");
        }
      } catch (error) {
       
      }
    };

    fetchBuyerLicenses();
  }, []);

  return linkedUsers;
}


/*find buyer tickets*/
function useBuyerTickets() {
  const [buyerTickets, setBuyerTickets] = useState([]);

  useEffect(() => {
    const fetchBuyerTickets = async () => {
      try {
        const url = "http://localhost:8080/ticket/findByBuyer/1";
        const res = await axios.get(url);
        if (res.status === 200) {
          const data = res.data;
          setBuyerTickets(data);
        } else {
          alert("Error Web Service!");
        }
      } catch (error) {
       
      }
    };

    fetchBuyerTickets();
  }, []);

  return buyerTickets;
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


function useBuyerManagers(buyerId) {
  const [dataManager, setDataBuyerManager] = useState([]);

  useEffect(() => {
    const fetchBuyerManagers = async () => {
      try {
        const url = `http://localhost:8080/buyer/1/findManagers`; // Use buyerId dynamically
        const res = await axios.get(url);
        if (res.status === 200) {
          setDataBuyerManager(res.data);
        }
      } catch (error) {
        console.error('Error fetching buyer managers:', error);
        // Handle error state if needed
      }
    };

    fetchBuyerManagers();
  }, [buyerId]);

  return dataManager;
}


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
