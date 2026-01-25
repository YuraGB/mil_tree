import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useReportAssignSelect } from '../../hooks/useReportAssignSelect';
import { FormControl } from '@/components/ui/form';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export const SelectAssignedTo: React.FC<Props> = ({ value, onChange }) => {
  const { persons } = useReportAssignSelect();

  return (
    <Select value={value} onValueChange={onChange} required>
      <FormControl>
        <SelectTrigger id="checkout-exp-month-ts6" className="w-full">
          <SelectValue placeholder="Select Report Type" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {persons.map((person) => (
          <SelectItem value={person.id} key={person.id}>
            {person.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
