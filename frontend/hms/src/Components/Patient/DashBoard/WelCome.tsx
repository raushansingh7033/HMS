import { Avatar } from "@mantine/core";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../../Service/UserService";
import { useEffect, useState } from "react";
import useProtectedImage from "../../../Utility/DropZone/useProtectedImage";

const WelCome = () => {
  const user = useSelector((state: any) => state.user);
  const [picId, setPicId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserProfile(user.id)
      .then((data) => {
        setPicId(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(picId);
  }, [user]);
  const url = useProtectedImage(picId);
  return (
    <div className="bg-blue-50 p-5  rounded-xl shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between ">
        <div>
          <div>Welcome Back</div>
          <div className="font-semibold text-xl text-blue-600">{user.name}</div>
          <div className="text-sm">A+,India</div>
        </div>
        <Avatar src={url} variant="filled" alt="it's me" size={100} />
      </div>
      <div className="gap-5 flex">
        <div className="p-3 rounded-xl bg-violet-200">
          <div className=" text-sm">Visits</div>
          <div className="font-semibold text-lg text-violet-700">120+</div>
        </div>
        <div className="p-3 rounded-xl bg-orange-200">
          <div className=" text-sm">Medications</div>
          <div className="font-semibold text-lg text-orange-700">120+</div>
        </div>
      </div>
    </div>
  );
};

export default WelCome;
