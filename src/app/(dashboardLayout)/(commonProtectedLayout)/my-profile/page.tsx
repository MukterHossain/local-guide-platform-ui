import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getMyProfile } from "@/services/auth/auth.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";

const MyProfilePage = async () => {
     const userInfo = await getUserInfo() as UserInfo; 
     const userData = await getMyProfile()
     console.log("Tourist userInfo", userInfo)
     console.log(" userData", userData)
    return (
        <div>
             <MyProfile userInfo={userData.data}></MyProfile>
        </div>
    );
};

export default MyProfilePage;