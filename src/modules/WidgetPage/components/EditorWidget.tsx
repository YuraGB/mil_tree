import EditorIndex from '@/modules/EditorClient';
import WidgetContainer from '@/modules/WidgetPage/WidgetConteiner';
import { IWidgetProps } from '@/types';
import Delta from 'quill-delta';
import React, { useCallback } from 'react';

export const EditorWidget = React.memo(
  ({ widget, removeWidget, saveWidget }: IWidgetProps) => {
    // Callback to update editor content
    const updateEditorContent = useCallback(
      (delta?: Delta) => {
        if (delta) {
          saveWidget(widget.id, { content: delta as unknown as string });
        }
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
        <EditorIndex handleSave={updateEditorContent} />
      </WidgetContainer>
    );
  },
);

EditorWidget.displayName = 'EditorWidget';
