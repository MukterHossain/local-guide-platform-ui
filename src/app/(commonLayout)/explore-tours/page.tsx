import ExploreTours from '@/components/modules/Common/ExploreTours/ExploreTours';
import { queryStringFormatter } from '@/lib/formatters';
import { getTourListsForPublic } from '@/services/common/exploreTours';

const ExploreToursPage =async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const tourListResult = await getTourListsForPublic(queryString);
    const totalPages = Math.ceil(
        (tourListResult?.meta?.total || 1) / (tourListResult?.meta?.limit || 1)
    );
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4 text-center">ExploreTours</h1>
            {
                tourListResult?.error && <p className="text-red-500">Explor Tours not found</p>
            }
            <ExploreTours tourLists={tourListResult?.data || []} />
        </div>
    );
};

export default ExploreToursPage;