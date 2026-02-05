const medicines = [
  {
    name: "Paracetamol",
    dosage: "500mg",
    stock: 120,
    manufacturer: "ABC Pharma",
  },
  { name: "Ibuprofen", dosage: "200mg", stock: 80, manufacturer: "XYZ Labs" },
  {
    name: "Amoxicillin",
    dosage: "250mg",
    stock: 50,
    manufacturer: "HealWell Pharma",
  },
  {
    name: "Cetirizine",
    dosage: "10mg",
    stock: 150,
    manufacturer: "MediCare Ltd.",
  },
  {
    name: "Vitamin C",
    dosage: "500mg",
    stock: 200,
    manufacturer: "NutriHealth",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    stock: 90,
    manufacturer: "LifeCare Pharma",
  },
  {
    name: "Aspirin",
    dosage: "75mg",
    stock: 60,
    manufacturer: "GoodHealth Labs",
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

const Medications = () => {
  return (
    <div className="p-3 border rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
      <div className="text-xl font-semibold">Medicine Stock</div>

      {/* Scrollable list */}
      <ResponsiveList height={300}>
        {medicines.map((med, index) => (
          <MedicineCard key={index} {...med} />
        ))}
      </ResponsiveList>
    </div>
  );
};

const MedicineCard = (med: any) => {
  return (
    <div className="p-3 mb-3 border rounded-xl flex justify-between items-center bg-white shadow-sm">
      {/* Left Section */}
      <div>
        <div className="font-medium text-gray-800">{med.name}</div>
        <div className="text-sm text-gray-500">{med.dosage}</div>
      </div>

      {/* Right Section */}
      <div className="text-right">
        <div className="font-medium text-gray-800">Stock: {med.stock}</div>
        <div className="text-sm text-gray-500">{med.manufacturer}</div>
      </div>
    </div>
  );
};

export default Medications;
