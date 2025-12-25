import { RenderNodeProps } from '@/modules/Overview/components/units/renderTree';
import { ICommandPerson, IPerson } from '../widgets';

export type TReportType =
  | 'complaint'
  | 'vacation'
  | 'transfer'
  | 'medical'
  | 'release';
export type TReportStatus = 'inProgress' | 'approoved' | 'declined';
export type TReportAssigned =
  | 'declined'
  | 'approoved'
  | ICommandPerson['name']
  | 'created';

export interface Report {
  id: string;
  to: Omit<ICommandPerson, 'subordinates'>;
  from: Omit<IPerson, 'subordinates'>;
  type: TReportType;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: TReportStatus;
  assigned: TReportAssigned;
}

export type TRoot = Record<TReportAssigned, Report[]>;

export type TReportColProps = {
  name: TReportAssigned;
  reports: Report[];
  dragProps: RenderNodeProps;
};

export type TOnDragArgs = {
  e: React.MouseEvent;
  nodeEl: HTMLElement;
  id: string;
};
export type TOnDragFn = (
  e: React.MouseEvent,
  nodeEl: HTMLElement,
  id: string,
) => void;
