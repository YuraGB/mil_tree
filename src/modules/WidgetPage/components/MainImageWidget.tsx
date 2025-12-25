import React, { useCallback } from 'react';
import WidgetContainer from '@/modules/WidgetPage/WidgetConteiner';
import MainImageDashboard from '@/components/MainImageDashboard';
import { IWidgetProps, Widget } from '@/types';

export const MainImageWidget = React.memo(
  ({ widget, removeWidget, saveWidget }: IWidgetProps) => {
    // Callback to update editor content
    const saveImageHandler = useCallback(
      (file?: File) => {
        saveWidget(widget.id, { CharacterDataimage: file });
      },
      [saveWidget, widget.id],
    );

    return (
      <WidgetContainer
        widgetName={widget.type}
        onRemoveHandler={removeWidget}
        widgetId={widget.id}
        key={widget.id}
      >
        <MainImageDashboard handleSave={saveImageHandler} />
      </WidgetContainer>
    );
  },
);
