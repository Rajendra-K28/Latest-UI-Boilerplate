import type { ReactNode } from 'react';

export type ReportCardConfig = {
  id: string;
  icon: ReactNode;
  title: string;
  format: string;
  description: string;
  iconBg: string;
  iconColor: string;
};
