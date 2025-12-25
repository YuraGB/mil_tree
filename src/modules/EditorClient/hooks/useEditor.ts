'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css';
import { EditorProps } from '@/types';

/* ─────────────────────────────────────────────────────
   ✅ MUST-HAVE FIX: allow blob: URLs for images
   Quill by default sanitizes blob URLs → "//:0"
   ───────────────────────────────────────────────────── */
const Image = Quill.import('formats/image');
(Image as any).sanitize = (url: string) => url;

/* ─────────────────────────────────────────────────────
   Hook
   ───────────────────────────────────────────────────── */
export const useEditorClient = (
  props: EditorProps,
  ref: React.ForwardedRef<Quill | null>,
) => {
  const { defaultValue, onTextChange, onSelectionChange, readOnly } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const defaultValueRef = useRef<Delta | undefined>(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  /* keep callbacks fresh */
  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  }, [onTextChange, onSelectionChange]);

  /* toggle readOnly */
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!readOnly);
    }
  }, [readOnly]);

  /* initialize Quill ONCE */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 🔥 CRITICAL: prevent double init in React 18 StrictMode
    if (container.querySelector('.ql-editor')) return;

    const editorContainer = document.createElement('div');
    container.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      theme: 'snow',
      readOnly,
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
          handlers: {
            image: () => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.click();

              input.onchange = () => {
                const file = input.files?.[0];
                if (!file) return;

                // ✅ preview without upload
                const blobUrl = URL.createObjectURL(file);

                const range = quill.getSelection(true);
                const index = range?.index ?? quill.getLength();

                quill.insertEmbed(index, 'image', blobUrl, 'user');
                quill.setSelection(index + 1, 0);

                // optional: upload → replace src → revoke
              };
            },
          },
        },
      },
    });

    quillRef.current = quill;

    // forward ref
    if (ref && typeof ref !== 'function') {
      ref.current = quill;
    }

    props.onReady?.(quill);

    // set initial content
    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    // events
    quill.on('text-change', (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on('selection-change', (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    // ❗ NO DOM cleanup
    return () => {
      if (ref && typeof ref !== 'function') {
        // ref.current = null;
      }
      // quillRef.current = null;
    };
  }, []);

  return { containerRef };
};
