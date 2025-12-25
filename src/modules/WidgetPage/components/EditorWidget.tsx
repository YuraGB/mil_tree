import KarmaBar from '@/components/KarmaProgressDashboard';
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
        saveWidget(widget.id, { content: delta });
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
        <KarmaBar
          valueDefault={widget.props?.karmaValue ?? 0}
          saveWidget={saveWidget}
          widgetId={widget.id}
        />
        <EditorIndex handleSave={updateEditorContent} />
      </WidgetContainer>
    );
  },
);
