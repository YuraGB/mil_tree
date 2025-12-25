import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

function renderDeltaToHtml(delta: any) {
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
}

export { renderDeltaToHtml };
