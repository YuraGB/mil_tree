import { IWidgetProps } from '@/types';
import { memo } from 'react';
import WidgetContainer from '../WidgetConteiner';
import { STATUSES } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const StatusSelectorWidjet = memo(
  ({ widget, removeWidget, saveWidget }: IWidgetProps) => {
    return (
      <WidgetContainer
        widgetName={widget.type}
        onRemoveHandler={removeWidget}
        widgetId={widget.id}
        key={widget.id}
      >
        <Select
          onValueChange={(val) => saveWidget(widget.id, { status: val })}
          value={widget.props?.status || ''}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a widget to display" />
          </SelectTrigger>
          <SelectContent className="w-[200px]">
            {Object.values(STATUSES).map((status) => (
              <SelectItem
                key={status.code}
                value={status.code}
                className="w-[200px] capitalize"
              >
                {status.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </WidgetContainer>
    );
  },
);

StatusSelectorWidjet.displayName = 'StatusSelectorWidjet';
