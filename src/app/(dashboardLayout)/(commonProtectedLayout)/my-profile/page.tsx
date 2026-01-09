import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getLocations } from "@/services/admin/locationManagement";
import { getMyProfile } from "@/services/auth/auth.service";

const MyProfilePage = async () => {
    //  const userInfo = await getUserInfo() as UserInfo; 
     const userData = await getMyProfile()
     const locations = await getLocations();
    //  console.log("Tourist userInfo", userInfo)
     console.log(" userData", userData)
    return (
        <div>
             <MyProfile userInfo={userData.data} locations={locations?.data}></MyProfile>
        </div>
    );
};

export default MyProfilePage;