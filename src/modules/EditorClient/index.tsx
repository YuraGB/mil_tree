"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useEditorIndex } from "./hooks/useEditorIndex";
import { EditorIndexProps } from "@/types";
import React from "react";

const EditorClient = dynamic(
  () => import("./EditorComponent").then((mod) => mod.default),
  { ssr: false },
);

function EditorIndex(props: EditorIndexProps) {
  const { isDirty, onSave, quillRef, readOnly, onEditorReady, setReadOnly } =
    useEditorIndex(props);

  // const [html, setHtml] = useState<string>('');
  // const handler = () => {
  //   const delta = quillRef.current?.getContents();
  //   if (delta) {
  //     // // 1. Зберегти delta у БД
  //     // fetch('/api/save', {
  //     //   method: 'POST',
  //     //   body: JSON.stringify({ content: delta }),
  //     // });

  //     // 2. Конвертувати у HTML для перегляду
  //     const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  //     const htmlOutput = converter.convert();
  //     setHtml(htmlOutput);
  //   }
  // };

  return (
    <section className="py-2">
      <EditorClient
        readOnly={readOnly}
        onReady={onEditorReady}
        ref={quillRef}
      />
      <div className="controls">
        <label>
          Read Only:{" "}
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

      {/* <div className="state">
          <div className="state-title">Last Change:</div>
          {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
        </div> */}

      {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
    </section>
  );
}

export default React.memo(EditorIndex);
