import { Delta } from 'quill';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export const ProfileInfo = ({ content }: { content: Delta | null }) => {
  const converter = new QuillDeltaToHtmlConverter(content?.ops || [], {});
  const htmlOutput = converter.convert();

  return (
    <>
      <section
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: htmlOutput }}
      />
    </>
  );
};
