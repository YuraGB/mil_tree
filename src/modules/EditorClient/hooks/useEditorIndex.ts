import { EditorIndexProps } from '@/types';
import Quill from 'quill';
import { useRef, useState } from 'react';

export const useEditorIndex = ({ widget, handleSave }: EditorIndexProps) => {
  // Logic and config for EditorIndex
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill | null>(null);

  const [isDirty, setIsDirty] = useState(false);

  const onSave = () => {
    const delta = quillRef.current?.getContents();

    if (!delta || !handleSave) return;

    // save in db etc...
    handleSave(delta);

    // reset dirty state
    setIsDirty(false);
  };

  // Handler for when the editor is ready
  const onEditorReady = (quill: Quill) => {
    const initial = widget?.props?.content
      ? JSON.parse(widget.props.content)
      : { ops: [] };
    const handler = () => {
      const current = quill.getContents();
      setIsDirty(JSON.stringify(current) !== JSON.stringify(initial));
    };

    quill.on('text-change', handler);
  };

  return { quillRef, readOnly, setReadOnly, isDirty, onSave, onEditorReady };
};
