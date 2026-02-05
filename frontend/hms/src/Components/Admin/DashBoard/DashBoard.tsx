import Appointment from "./Appointment";
import DiseaseChart from "./DiseaseChart";
import Doctor from "./Doctor";
import Medicine from "./Medicine";
import Patient from "./Patient";
import TopCards from "./TopCards";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopCards />
      <div className="grid grid-cols-3 gap-5">
        <DiseaseChart />
        <Appointment />
        <Medicine />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Patient />
        <Doctor />
      </div>
    </div>
  );
};

export default DashBoard;
