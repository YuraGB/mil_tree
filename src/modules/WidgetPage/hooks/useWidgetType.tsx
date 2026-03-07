import { EditorWidget } from '../components/EditorWidget';
import { MainImageWidget } from '../components/MainImageWidget';
import { RankSelectorWidget } from '../components/RankSelectorWidget';
import { StatusSelectorWidget } from '../components/StatusSelectorWidget';
import { TWidgetNames } from '@/types';
import { AwardsSelectorWidget } from '../components/AwardsSelectorWidget';
import { AssignmentWidget } from '../components/AssigmentSelectorWidget';

export const useWidgetType = (): {
  [key in TWidgetNames]: React.ElementType;
} => ({
  editor: EditorWidget,
  main_image: MainImageWidget,
  status_selector: StatusSelectorWidget,
  rank_selector: RankSelectorWidget,
  awards: AwardsSelectorWidget,
  assignment: AssignmentWidget,
});
