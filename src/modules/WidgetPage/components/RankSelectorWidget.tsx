import { IWidgetProps } from '@/types';
import { memo } from 'react';
import WidgetContainer from '../WidgetConteiner';
import { RANKS } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const RankSelectorWidget = memo(
  ({ widget, removeWidget, saveWidget }: IWidgetProps) => {
    return (
      <WidgetContainer
        widgetName={widget.type}
        onRemoveHandler={removeWidget}
        widgetId={widget.id}
        key={widget.id}
      >
        <Select
          onValueChange={(val) => saveWidget(widget.id, { rank: val })}
          value={widget.props?.rank || ''}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a widget to display" />
          </SelectTrigger>
          <SelectContent className="w-[200px]">
            {RANKS.map((rank) => (
              <SelectItem
                key={rank}
                value={rank}
                className="w-[200px] capitalize"
              >
                {rank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </WidgetContainer>
    );
  },
);
