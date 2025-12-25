import { Button } from '@/components/ui/button';
import { RenderNodeProps } from '@/modules/Overview/components/units/renderTree';
import { Report } from '@/types/client/Reports';

export const ReportColumnItem = ({
  report,
  dragProps,
}: {
  report: Report;
  dragProps: RenderNodeProps;
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragProps?.onDragStart) {
      dragProps.onDragStart(e, e.currentTarget as HTMLElement, report.id);
    }
  };
  return (
    <Button
      variant={'secondary'}
      className={`card flex p-2 ${dragProps?.dropTargetId === report.id ? 'drop-target' : ''}`}
      onMouseDown={handleMouseDown}
    >
      {report.type}
    </Button>
  );
};
