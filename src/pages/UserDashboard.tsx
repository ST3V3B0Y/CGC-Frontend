import React from "react";
import Navbar from "../components/NavBar";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido a tu panel</h1>
      </div>
    </div>
  );
};

export default Dashboard;