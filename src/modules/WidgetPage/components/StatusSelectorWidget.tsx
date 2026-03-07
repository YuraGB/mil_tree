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

export const StatusSelectorWidget = memo(
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a widget to display" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {Object.values(STATUSES).map((status) => (
              <SelectItem
                key={status.code}
                value={status.code}
                className="w-full capitalize"
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

StatusSelectorWidget.displayName = 'StatusSelectorWidget';
