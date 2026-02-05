import { Avatar } from "@mantine/core";
import { useSelector } from "react-redux";

const WelCome = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <div>
      <div>
        <div>
          <div>Welcome Back</div>
          <div>{user.name}</div>
          <div>Surgery,Cardiology</div>
        </div>
        <Avatar src={user?.image} alt="it's me" radius="xl" size="lg" />
      </div>
    </div>
  );
};

export default WelCome;
