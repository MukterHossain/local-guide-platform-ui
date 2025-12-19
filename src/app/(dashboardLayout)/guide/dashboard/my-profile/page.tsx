import GuideProfile from "@/components/modules/Guide/GuideProfile/GuideProfile";
import { queryStringFormatter } from "@/lib/formatters";
import { getGuide } from "@/services/guide/guideManagement";

const MyProfilePage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const guideResult = await getGuide(queryString);
    console.log("Guide ", guideResult)
    return (
        <div> 
            <GuideProfile guide={guideResult?.data || []}></GuideProfile>
        </div>
    );
};

export default MyProfilePage