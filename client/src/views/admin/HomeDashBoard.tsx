import React from "react";
import { DashboardOverview, OrdersTable } from "../../components";
import Chart from "../../components/Chart";

const HomeDashBoard = () => {
  return (
    <section>
      <div className="flex justify-center items-center mb-5">
        <DashboardOverview />
        <DashboardOverview />
        <DashboardOverview />
        <DashboardOverview />
      </div>
      <div className="flex justify-center items-center">
        <OrdersTable />
        <Chart />
      </div>
    </section>
  );
};

export default HomeDashBoard;
