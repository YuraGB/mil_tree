import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

function renderDeltaToHtml(delta: { ops: unknown }) {
  // @ts-expect-error any
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
}

export { renderDeltaToHtml };
