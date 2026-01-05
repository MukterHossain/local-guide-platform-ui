import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTourById } from "@/services/admin/tourListManagement";
import { ITourList } from "@/types/tourList.interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string | undefined;
}
const AdminTouristListViewFormDialog = ({ open, onOpenChange, id }: IProps) => {
    const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ITourList | null>(null);

  useEffect(() => {
    if (!open || !id) return;

    (async () => {
      setLoading(true);

      const res = await getTourById(id);
// console.log("GET USER RES:", res);

      if (res.success) {
        setData(res.data);
      } else {
        toast.error(res.message);
      }

      setLoading(false);
    })();

  }, [open, id]);

    return (
        <div>
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-center">
        Tourist List Information
      </DialogTitle>
    </DialogHeader> 
  </DialogContent>
</Dialog>
            
        </div>
    );
};

export default AdminTouristListViewFormDialog;