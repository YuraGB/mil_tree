import { REPORT_TYPES } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dispatch, SetStateAction } from 'react';
import { TReportType } from '@/types/reports';

export const ReportTypeSelect: React.FC<{
  setChosenReportType: Dispatch<SetStateAction<TReportType | null>>;
}> = ({ setChosenReportType }) => {
  return (
    <Select
      defaultValue=''
      onValueChange={(v: TReportType) => setChosenReportType(v)}
      required
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select assignee' />
      </SelectTrigger>
      <SelectContent>
        {REPORT_TYPES.map((type) => (
          <SelectItem value={type} key={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
