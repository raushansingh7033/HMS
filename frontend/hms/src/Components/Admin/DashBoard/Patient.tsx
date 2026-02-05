const patients = [
  {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    location: "Bhopal",
    bloodGroup: "A+",
  },
  {
    name: "Priya Verma",
    email: "priya@example.com",
    location: "Indore",
    bloodGroup: "B-",
  },
  {
    name: "Aman Kumar",
    email: "aman@example.com",
    location: "Gwalior",
    bloodGroup: "O+",
  },
  {
    name: "Sneha Patel",
    email: "sneha@example.com",
    location: "Jabalpur",
    bloodGroup: "AB+",
  },
  {
    name: "Rohit Singh",
    email: "rohit@example.com",
    location: "Bhopal",
    bloodGroup: "A-",
  },
  {
    name: "Alok Yadav",
    email: "alok@example.com",
    location: "Indore",
    bloodGroup: "B+",
  },
  {
    name: "Simran Kaur",
    email: "simran@example.com",
    location: "Gwalior",
    bloodGroup: "O-",
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

const Patient = () => {
  return (
    <div className="p-3 border rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
      <div className="text-xl font-semibold">Patient Details</div>

      <ResponsiveList height={300}>
        {patients.map((patient, index) => (
          <Card key={index} {...patient} />
        ))}
      </ResponsiveList>
    </div>
  );
};

const Card = (patient: any) => {
  return (
    <div className="p-3 mb-3 border rounded-xl flex justify-between">
      <div>
        <div className="font-medium">{patient.name}</div>
        <div className="text-sm text-gray-500">{patient.email}</div>
      </div>
      <div>
        <div className="font-medium">{patient.location}</div>
        <div className="text-sm text-gray-500">{patient.bloodGroup}</div>
      </div>
    </div>
  );
};

export default Patient;
