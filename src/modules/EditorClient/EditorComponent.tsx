import React, { forwardRef } from "react";
import Quill from "quill"; // Імпортуємо сам клас Quill
import { useEditorClient } from "./hooks/useEditor";
import { EditorProps } from "@/types";

const EditorClient = forwardRef<Quill | null, EditorProps>((props, ref) => {
  // Logic and config for Editor
  const { containerRef } = useEditorClient(props, ref);

  return <div ref={containerRef} />;
});

EditorClient.displayName = "Editor";

export default React.memo(EditorClient);
