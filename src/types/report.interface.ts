import { ReportStatus } from "./enum";
import { IUserGuide, UserInfo } from "./user.interface";

export interface IReport {
  id: string;
  reporterId: string;
  guideId: string;

  reason: string;
  details?: string | null;
  status: ReportStatus;

  adminId?: string | null;
  adminNote?: string | null;
  resolvedAt?: string | null;

  reporter?: UserInfo;
  guide?: IUserGuide;
  admin?: UserInfo | null;

  createdAt: string;
  updatedAt: string;
}
