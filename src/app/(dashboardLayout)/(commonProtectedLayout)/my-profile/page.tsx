import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";

const MyProfilePage = async () => {
//   const userInfo = await getUserInfo()
  const userInfo = await getUserInfo() as UserInfo; // ‍add UsserInfo
  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Role: {userInfo.role}</p>
    </div>
  );
};

export default MyProfilePage;