import { Avatar } from "@mantine/core";
import React from "react";
import { formatDate } from "../../../Utility/DateUtility";
import { bloodGroupMap } from "../../../data/DropdownData";

const DoctorCard = ({
  name,
  email,
  dob,
  phone,
  address,
  department,
  specialization,
  totalExp,
}: any) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer bg-white min-w-[320px] max-w-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Avatar name={name} variant="filled" color="blue" />
        <div className="font-semibold text-lg">{name}</div>
      </div>

      {/* Info Rows */}
      <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
        <div className="text-gray-500">Email:</div>
        <div className="break-words">{email}</div>

        <div className="text-gray-500">Date of Birth:</div>
        <div>{formatDate(dob)}</div>

        <div className="text-gray-500">Phone:</div>
        <div>{phone}</div>

        <div className="text-gray-500">Address:</div>
        <div className="break-words">{address}</div>

        <div className="text-gray-500">Department:</div>
        <div className="break-words">{department}</div>

        <div className="text-gray-500">Specialization:</div>
        <div className="break-words">{specialization}</div>
        <div className="text-gray-500">Total Experience:</div>
        <div>{totalExp} years</div>
      </div>
    </div>
  );
};

export default DoctorCard;
