'use client';
import WidgetSelector from '@/components/WidgetSelector';
import { useWidget } from './hooks/useWidget';
import { ButtonSave } from './components/ButtonSave';
import { TPersonsRespons } from '@/types/persons';

export const WidgetPage = ({ person }: { person: TPersonsRespons }) => {
  const { addNewWidget, removeWidget, widgets, saveWidget, savePage, content } =
    useWidget(person);

  console.log('Rendering WidgetPage with widgets:', widgets);

  return (
    <article className="w-full px-4">
      <WidgetSelector addWidgetHandler={addNewWidget} />

      {content.map((Component, index) => (
        <Component
          key={widgets[index].id}
          widget={widgets[index]}
          removeWidget={removeWidget}
          saveWidget={saveWidget}
        />
      ))}

      <ButtonSave onClick={savePage} />
    </article>
  );
};
