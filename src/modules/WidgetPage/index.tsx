"use client";
import WidgetSelector from "@/components/WidgetSelector";
import { useWidget } from "./hooks/useWidget";
import { ButtonSave } from "./components/ButtonSave";

export const WidgetPage = ({ personId }: { personId: string }) => {
  console.log(personId);
  const { addNewWidget, removeWidget, widgets, saveWidget, savePage, content } =
    useWidget();

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
