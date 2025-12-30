import { IUserGuide } from "@/types/user.interface";
import FindGuideCard from "./FindGuideCard";


interface FindGuideGridProps { 
    guides: IUserGuide[]
}
const FindGuideGrid = ({guides}: FindGuideGridProps) => {
    if(guides.length === 0) {
        return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No guides found found matching your criteria.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
      )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <FindGuideCard key={guide.id} guide={guide} />
      ))}
    </div>
    );
};

export default FindGuideGrid;