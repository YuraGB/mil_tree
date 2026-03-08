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

/**
 * Render the editor UI with a Quill-based editor, a read-only toggle, and a conditional Save button.
 *
 * The editor is prefilled from `props.widget.props.content` if present (parsed as JSON). Toggling the Read Only checkbox updates the editor mode; the Save button is shown only when the editor is dirty and triggers the provided save handler.
 *
 * @param props - Component props. If `props.widget?.props?.content` contains a JSON string, it will be parsed and passed as the editor's `defaultValue`.
 * @returns The editor UI as a React element.
 */
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
