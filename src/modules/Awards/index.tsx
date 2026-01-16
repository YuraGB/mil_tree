import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AWARDS } from '@/constants';

export const AwardsSelector = ({
  onValueChange,
  value,
}: {
  onValueChange: (...event: string[]) => void;
  value: string | undefined;
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an award" />
      </SelectTrigger>
      <SelectContent className="w-[200px]">
        {AWARDS.map((award, index) => (
          <SelectItem
            key={award.name + index}
            value={award.name}
            className="w-[200px] capitalize"
          >
            {`${award.icon} ${award.title}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
