import { IWidgetProps } from '@/types';
import WidgetContainer from '../WidgetConteiner';
import { AssignmentSelector } from '@/modules/Assignments';

export const AssignmentSelectorWidget = ({
  removeWidget,
  saveWidget,
  widget,
}: IWidgetProps) => {
  return (
    <WidgetContainer
      onRemoveHandler={removeWidget}
      widgetId={widget.id}
      widgetName={widget.type}
    >
      <div>Assignment Selector Widget</div>
      <AssignmentSelector
        onValueChange={(val) => saveWidget(widget.id, { assignmentRole: val })}
        value={widget.props?.assignmentRole || ''}
      />
    </WidgetContainer>
  );
};
