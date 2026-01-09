
import BecomeGuideForm from '@/components/modules/Common/BecomeGuide/BecomeGuideForm';
import { getLocations } from '@/services/admin/locationManagement';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { UserInfo } from '@/types/user.interface';
import { redirect } from 'next/navigation';


const BecomeGuidePage = async () => {
    const locations = await getLocations();
    const userInfo = (await getUserInfo()) as UserInfo;
    console.log("userInfo", userInfo)
    console.log("locations", locations)
   

  // ❌ Not logged in
  if (!userInfo) {
    redirect("/register?intent=become-guide");
  }

  // if (userInfo.profile?.verificationStatus === "PENDING") {
    
  //   redirect("/dashboard");
  // }

  // ❌ Already a guide
  if (userInfo?.role === "GUIDE") {
    redirect("/guide/dashboard");
  }

    return (
        <div className="flex min-h-screen items-center justify-center">

            <div className="w-full max-w-lg space-y-6 rounded-lg border p-8 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Become a Guide</h2>
                <BecomeGuideForm locations={locations?.data} userInfo={userInfo}></BecomeGuideForm>

            </div>
        </div>
    );
};

export default BecomeGuidePage;