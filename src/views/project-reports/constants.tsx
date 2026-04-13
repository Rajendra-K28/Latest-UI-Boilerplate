import { Clipboard, ClipboardList, Document, AlertTriangle } from '../../components';
import type { ReportCardConfig } from './types';

export const REPORT_CARDS: ReportCardConfig[] = [
  {
    id: 'executive-summary',
    icon: <Clipboard />,
    title: 'ASV Attestation',
    format: 'PDF',
    description: 'High-level overview of control effectiveness and completion status.',
    iconBg: '#EFF8FF',
    iconColor: '#175CD3',
  },
  {
    id: 'evidence-audit-log',
    icon: <ClipboardList />,
    title: 'ASV Scan Report Summary',
    format: 'PDF',
    description: 'Detailed export of all evidence items, assignees, and approval statuses.',
    iconBg: '#EFF8FF',
    iconColor: '#175CD3',
  },
  {
    id: 'action-plan',
    icon: <Document />,
    title: 'ASV Scan Report Vulnerability Details',
    format: 'PDF',
    description: 'List of all open remediation tasks and compliance gaps.',
    iconBg: '#EFF8FF',
    iconColor: '#175CD3',
  },
  {
    id: 'vulnerability-report',
    icon: <AlertTriangle />,
    title: 'Failed Vulnerability Report',
    format: 'PDF',
    description: 'Critical and high severity vulnerabilities that must be remediated for compliance.',
    iconBg: '#EFF8FF',
    iconColor: '#175CD3',
  },
];
