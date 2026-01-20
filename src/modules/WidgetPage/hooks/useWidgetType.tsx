import { EditorWidget } from '../components/EditorWidget';
import { MainImageWidget } from '../components/MainImageWidget';
import { RankSelectorWidget } from '../components/RankSelectorWidget';
import { StatusSelectorWidjet } from '../components/StatusSelectorWidjet';
import { TWidgetNames } from '@/types';
import { AwardsSelectorWidget } from '../components/AwardsSelectorWidget';

export const useWidgetType = (): {
  [key in TWidgetNames]: React.ElementType;
} => ({
  editor: EditorWidget,
  main_image: MainImageWidget,
  status_selector: StatusSelectorWidjet,
  rank_selector: RankSelectorWidget,
  awards: AwardsSelectorWidget,
});
