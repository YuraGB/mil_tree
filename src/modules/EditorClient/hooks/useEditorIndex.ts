import { EditorIndexProps } from '@/types';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { set } from 'zod';

export const useEditorIndex = ({
  valueDefault,
  handleSave,
}: EditorIndexProps) => {
  // Logic and config for EditorIndex
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill | null>(null);

  const [isDirty, setIsDirty] = useState(false);

  // Initialize the editor with default content if provided
  useEffect(() => {
    if (valueDefault && quillRef.current) {
      quillRef.current.setContents(valueDefault);
    }
  }, [valueDefault]);

  const onSave = () => {
    const delta = quillRef.current?.getContents();

    if (!delta || !handleSave) return;
    // save in db etc...
    handleSave(delta);

    // reset dirty state
    setIsDirty(false);
  };
  const onEditorReady = (quill: Quill) => {
    const initial = valueDefault || { ops: [] };
    const handler = () => {
      const current = quill.getContents();
      setIsDirty(JSON.stringify(current) !== JSON.stringify(initial));
    };

    quill.on('text-change', handler);
  };

  return { quillRef, readOnly, setReadOnly, isDirty, onSave, onEditorReady };
};
