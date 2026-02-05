import Visits from "./Visits";
import DiseaseChart from "./DiseaseChart";
import WelCome from "./WelCome";
import Appointment from "./Appointment";
import Medications from "./Medications";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-5 mt-3">
      <div className="grid grid-cols-2 gap-2 ">
        <WelCome />
        <Visits />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <DiseaseChart />
        <Appointment />
        <Medications />
      </div>
    </div>
  );
};

export default DashBoard;
