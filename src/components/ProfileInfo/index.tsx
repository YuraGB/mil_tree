import { Delta } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import DOMPurify from 'dompurify';

export const ProfileInfo = ({ content }: { content: Delta | null }) => {
  const converter = new QuillDeltaToHtmlConverter(content?.ops || [], {});
  const htmlOutput = converter.convert();
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
