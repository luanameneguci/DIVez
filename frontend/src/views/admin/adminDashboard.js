import React, { useEffect, useState } from "react";
import axios from "axios";
import pb from "../../images/pendingbudgets.svg";
import pt from "../../images/pendingtickets.svg";
import userimg from "../../images/user.svg";

import Box from "../../components/admin/Box";
import BoxProgress from "../../components/admin/ProgressBox";
import TicketListBox from "../../components/admin/TicketListBox";
import BudgetListBox from "../../components/admin/BudgetListBox";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const numRowsToShow = 6;

const AdminDashboard = () => {
  const [waitingTicketsCount, setWaitingTicketsCount] = useState(0);
  const [pendingBudgetsCount, setPendingBudgetsCount] = useState(0);
  const [activeLicensesCount, setActiveLicensesCount] = useState(0);
  const [inactiveLicensesCount, setInactiveLicensesCount] = useState(0);

  const [budgetCounts, setBudgetCounts] = useState({
    labels: ["Pending", "Rejected", "Approved", "Completed"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#FFD56D", "#EB5757", "#00B69B", "#2D9CDB"],
      },
    ],
  });

  useEffect(() => {
    const fetchWaitingTicketsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ticket/pending");
        setWaitingTicketsCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching waiting tickets count:", error);
      }
    };

    fetchWaitingTicketsCount();
  }, []);

  useEffect(() => {
    const fetchPendingBudgetsCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/budget/pending");
        setPendingBudgetsCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching pending budgets count:", error);
      }
    };

    fetchPendingBudgetsCount();
  }, []);

  useEffect(() => {
    const fetchActiveLicensesCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/licenses/active");
        setActiveLicensesCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching active licenses count:", error);
      }
    };

    fetchActiveLicensesCount();
  }, []);

  useEffect(() => {
    const fetchInactiveLicensesCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/licenses/inactive");
        setInactiveLicensesCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching inactive licenses count:", error);
      }
    };

    fetchInactiveLicensesCount();
  }, []);

  useEffect(() => {
    const fetchBudgetCounts = async () => {
      try {
        const responses = await Promise.all([
          axios.get("http://localhost:8080/budget/pending"),
          axios.get("http://localhost:8080/budget/rejected"),
          axios.get("http://localhost:8080/budget/new"),
          axios.get("http://localhost:8080/budget/paid"),
        ]);

        const counts = {
          Pending: responses[0].data.count || 0,
          Rejected: responses[1].data.count || 0,
          New: responses[2].data.count || 0,
          Paid: responses[3].data.count || 0,
        };

        const updatedData = {
          labels: ["Pending", "Rejected", "New", "Paid"],
          datasets: [
            {
              data: [
                counts.Pending,
                counts.Rejected,
                counts.New,
                counts.Paid,
              ],
              backgroundColor: ["#2D9CDB", "#EB5757", "#FFD56D", "#00B69B"],
            },
          ],
        };

        setBudgetCounts(updatedData);
      } catch (error) {
        console.error("Error fetching budget counts:", error);
      }
    };

    fetchBudgetCounts();
  }, []);

  return (
    <div className="dashboard-content bg-light w-100">
      <h4 className="title mt-2 mb-0 mx-4">Dashboard</h4>
      <div className="container">
        <div className="my-4">
          <div className="d-flex justify-content-between">
            <div className="col mx-1">
              <Box
                title="Pending tickets"
                number={waitingTicketsCount}
                image={pt}
                evolution="10"
              />
            </div>
            <div className="col mx-1">
              <Box
                title="Pending Budgets"
                number={pendingBudgetsCount}
                image={pb}
                evolution="10"
              />
            </div>
            <div className="col mx-1">
              <Box
                title="Active Licences"
                number={activeLicensesCount}
                image={userimg}
                evolution="10"
              />
            </div>
            <div className="col mx-1">
              <Box
                title="Inactive Licences"
                number={inactiveLicensesCount}
                image={userimg}
                evolution="10"
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-4">
              <BoxProgress />
            </div>
            <div className="col-8">
              <TicketListBox numRowsToShow={numRowsToShow} />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-4">
              <div className="box-container bg-white col-auto roundbg d-flex shadow pb-3 shadow h-100">
                <div className="col-12">
                  <span className="box-title d-flex justify-content-start pt-3 ps-3 pb-3">
                    <strong>
                      <h4>Budgets</h4>
                    </strong>
                  </span>
                  <div className="px-3">
                    <Doughnut
                      data={budgetCounts}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      style={{ height: "300px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <BudgetListBox numRowsToShow={numRowsToShow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
