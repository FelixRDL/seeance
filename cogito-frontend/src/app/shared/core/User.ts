export interface User {
  id: string;
  login: string;
  avatarImageUrl: string;
  profileLink: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  visits: VisitStat[];
}

export interface VisitStat {
  url: string;
  courseName: string;
  projectName: string;
}
