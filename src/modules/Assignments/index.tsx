import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ASSIGNMENT_ROLES, UNIT_TYPES } from "@/constants";

export const AssignmentSelector = ({
  onValueChange,
  value,
}: {
  onValueChange: (...event: string[]) => void;
  value: string | undefined;
}) => {
  return (
    <section>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="UNIT_TYPES" />
        </SelectTrigger>
        <SelectContent className="w-[200px]">
          {Object.values(UNIT_TYPES).map((unit) => (
            <SelectItem
              key={unit}
              value={unit}
              className="w-[200px] capitalize"
            >
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="ASSIGNMENT_ROLES" />
        </SelectTrigger>
        <SelectContent className="w-[200px]">
          {Object.values(ASSIGNMENT_ROLES).map((assign) => (
            <SelectItem
              key={assign}
              value={assign}
              className="w-[200px] capitalize"
            >
              {assign}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};
