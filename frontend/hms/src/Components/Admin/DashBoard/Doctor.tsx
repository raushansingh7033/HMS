// Sample data with new fields
const Doctors = [
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    location: "Bhopal",
    department: "Cardiology",
  },
  {
    name: "Priya Verma",
    email: "priya.verma@example.com",
    location: "Indore",
    department: "Neurology",
  },
  {
    name: "Aman Kumar",
    email: "aman.kumar@example.com",
    location: "Bhopal",
    department: "Orthopedics",
  },
  {
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    location: "Gwalior",
    department: "Pathology",
  },
  {
    name: "Rohit Singh",
    email: "rohit.singh@example.com",
    location: "Bhopal",
    department: "General",
  },
  {
    name: "Alok Yadav",
    email: "alok.yadav@example.com",
    location: "Indore",
    department: "Radiology",
  },
  {
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    location: "Bhopal",
    department: "Dentistry",
  },
];

interface ResponsiveListProps {
  height?: number | string;
  children: React.ReactNode;
}

const ResponsiveList: React.FC<ResponsiveListProps> = ({
  height = 300,
  children,
}) => {
  return (
    <div
      style={{ maxHeight: typeof height === "number" ? `${height}px` : height }}
      className="overflow-y-auto w-full"
    >
      {children}
    </div>
  );
};

const Doctor = () => {
  return (
    <div className="p-3 border rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
      <div className="text-xl font-semibold">Today's Doctors</div>

      {/* Use ResponsiveList */}
      <ResponsiveList height={300}>
        {Doctors.map((app, index) => (
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
        <div className="font-medium">{app.name}</div>
        <div className="text-sm text-gray-500">{app.email}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">{app.location}</div>
        <div className="font-medium">{app.department}</div>
      </div>
    </div>
  );
};

export default Doctor;
