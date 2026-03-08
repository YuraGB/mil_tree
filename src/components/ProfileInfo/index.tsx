import { Delta } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import DOMPurify from 'isomorphic-dompurify';

export const ProfileInfo = ({ content }: { content: Delta | null }) => {
  const converter = new QuillDeltaToHtmlConverter(content?.ops || [], {});
  const htmlOutput = converter.convert();
  if (!htmlOutput) return null;
  const cleanHtml = DOMPurify.sanitize(htmlOutput);

  return (
    <>
      <section
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </>
  );
};
