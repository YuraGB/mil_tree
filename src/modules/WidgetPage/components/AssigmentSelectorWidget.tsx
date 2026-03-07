import { IWidgetProps } from '@/types';
import { memo } from 'react';
import WidgetContainer from '../WidgetConteiner';
import { ASSIGNMENT_ROLES } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const AssignmentWidget = memo(
  ({ widget, removeWidget, saveWidget }: IWidgetProps) => {
    return (
      <WidgetContainer
        widgetName={widget.type}
        onRemoveHandler={removeWidget}
        widgetId={widget.id}
        key={widget.id}
      >
        <Select
          onValueChange={(val) => saveWidget(widget.id, { assignment: val })}
          value={widget.props?.assignment || ''}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a widget to display" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {Object.entries(ASSIGNMENT_ROLES).map(([key, assigment]) => (
              <SelectItem
                key={assigment}
                value={key}
                className="w-full capitalize"
              >
                {assigment.replaceAll('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </WidgetContainer>
    );
  },
);

AssignmentWidget.displayName = 'AssignmentWidget';
