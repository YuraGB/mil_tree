import { TWidgetNames, Widget } from '@/types';
import { useCallback, useState } from 'react';
import { useWidgetType } from './useWidgetType';

export const useWidget = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const addNewWidget = useCallback((type?: TWidgetNames) => {
    if (!type) return;
    setWidgets((state) => [
      ...state,
      {
        id: state.length + 1,
        type,
        props: {},
        createdAt: new Date(),
      },
    ]);
  }, []);

  const removeWidget = useCallback(
    (widgetId: number) =>
      setWidgets((prev) => prev.filter(({ id }) => id !== widgetId)),
    [],
  );

  const saveWidget = useCallback(
    (widgetId: number, newProps: { key: string; value: string | number }) => {
      setWidgets((state) =>
        state.map((widget) =>
          widget.id === widgetId
            ? {
                ...widget,
                props: {
                  ...widget.props,
                  [newProps.key]: newProps.value.toString(), // ✅ перетворюємо number у string
                },
              }
            : widget,
        ),
      );
    },
    [],
  );

  const savePage = useCallback(
    () => {
      // Логіка збереження сторінки з віджетами
      // setWidgets([]);
    },
    [
      /*widgets*/
    ],
  );

  const widgetType = useWidgetType();

  const content = widgets.map((widget) => widgetType[widget.type]);

  return {
    widgets,
    setWidgets,
    addNewWidget,
    removeWidget,
    saveWidget,
    content,
    savePage,
  };
};
