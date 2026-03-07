import { TWidgetNames, Widget } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useWidgetType } from './useWidgetType';
import { TPersonsRespons } from '@/types/persons';
import { formatWidgetsDataForUpdateUser, getWidgetContent } from '../util';
import { Delta } from 'quill';
import { useUpdatePerson } from '../api/useUpdatePerson';

export const useWidget = (person: TPersonsRespons) => {
  const [widgets, setWidgets] = useState<Widget[]>(getWidgetContent(person));
  const { updatePerson, data } = useUpdatePerson();

  const addNewWidget = useCallback((type?: TWidgetNames) => {
    if (!type) return;
    setWidgets((state) => [
      ...state,
      {
        id: String(state.length + 1),
        type,
        props: {},
        createdAt: new Date(),
      },
    ]);
  }, []);

  const removeWidget = useCallback(
    (widgetId: string) =>
      setWidgets((prev) => prev.filter(({ id }) => id !== widgetId)),
    [],
  );

  const saveWidget = useCallback(
    (
      widgetId: string,
      newProps: { [key: string]: string | number | Delta },
    ) => {
      setWidgets((state) =>
        state.map((widget) =>
          widget.id === widgetId
            ? {
                ...widget,
                props: {
                  ...widget.props,
                  ...Object.fromEntries(
                    Object.entries(newProps).map(([key, value]) => [
                      key,
                      value instanceof Delta
                        ? JSON.stringify(value)
                        : value.toString(),
                    ]),
                  ),
                },
              }
            : widget,
        ),
      );
    },
    [],
  );

  const savePage = async () => {
    const updatedData = formatWidgetsDataForUpdateUser(widgets, person);

    updatePerson(updatedData);
  };

  useEffect(() => {
    if (data && !data.error) {
      setTimeout(() => setWidgets([]), 0);
    }
  }, [data]);

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
