'use client';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useEditorIndex } from './hooks/useEditorIndex';
import { EditorIndexProps } from '@/types';
import React from 'react';

const EditorClient = dynamic(
  () => import('./EditorComponent').then((mod) => mod.default),
  { ssr: false },
);

function EditorIndex(props: EditorIndexProps) {
  const { isDirty, onSave, quillRef, readOnly, onEditorReady, setReadOnly } =
    useEditorIndex(props);

  return (
    <section className="py-2">
      <EditorClient
        readOnly={readOnly}
        onReady={onEditorReady}
        defaultValue={
          props.widget?.props?.content
            ? JSON.parse(props.widget.props.content)
            : undefined
        }
        ref={quillRef}
      />
      <div className="controls">
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
      </div>
      {isDirty && (
        <Button type="button" onClick={onSave} className="my-2">
          Save
        </Button>
      )}
    </section>
  );
}

export default React.memo(EditorIndex);
