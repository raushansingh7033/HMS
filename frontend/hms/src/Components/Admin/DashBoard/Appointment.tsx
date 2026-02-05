const appointments = [
  { patient: "Rahul Sharma", doctor: "Dr. Amit Singh", time: "10:30 AM", reason: "General Checkup" },
  { patient: "Priya Verma", doctor: "Dr. Neha Gupta", time: "11:00 AM", reason: "Fever" },
  { patient: "Aman Kumar", doctor: "Dr. Rajesh Kumar", time: "11:30 AM", reason: "Headache" },
  { patient: "Sneha Patel", doctor: "Dr. Pooja Mehta", time: "12:00 PM", reason: "Blood Test" },
  { patient: "Rohit Singh", doctor: "Dr. Arjun Yadav", time: "12:30 PM", reason: "Consultation" },
  { patient: "Alok Yadav", doctor: "Dr. Ritu Sharma", time: "01:00 PM", reason: "X-Ray" },
  { patient: "Simran Kaur", doctor: "Dr. Anil Kumar", time: "01:30 PM", reason: "Dental Checkup" },
];

interface ResponsiveListProps {
  height?: number | string;
  children: React.ReactNode;
}

const ResponsiveList: React.FC<ResponsiveListProps> = ({ height = 300, children }) => {
  return (
    <div
      style={{ maxHeight: typeof height === "number" ? `${height}px` : height }}
      className="overflow-y-auto w-full"
    >
      {children}
    </div>
  );
};

const Appointment = () => {
  return (
    <div className="p-3 border rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
      <div className="text-xl font-semibold">Today's Appointment</div>

      {/* Use ResponsiveList like Recharts ResponsiveContainer */}
      <ResponsiveList height={300}>
        {appointments.map((app, index) => (
          <Card key={index} {...app} />
        ))}
      </ResponsiveList>
    </div>
  );
};

const Card = (app: any) => {
  return (
    <div className="p-3 mb-3 border rounded-xl flex justify-between">
      <div>
        <div className="font-medium">{app.patient}</div>
        <div className="text-sm text-gray-500">{app.doctor}</div>
      </div>
      <div>
        <div className="font-medium">{app.time}</div>
        <div className="text-sm text-gray-500">{app.reason}</div>
      </div>
    </div>
  );
};

export default Appointment;
