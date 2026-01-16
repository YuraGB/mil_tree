'use cache';
export const PageWrapper = async ({
  sidebar,
  children,
  classes,
}: {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  classes?: {
    root?: string;
    main?: string;
  };
}) => {
  return (
    <div
      className={`grid min-h-screen grid-rows-[100px_1fr_20px] items-center justify-items-center gap-6 p-8 pt-0 pb-20 font-sans sm:p-20 sm:pt-0 ${classes?.root}`}
    >
      <header className="col-span-full row-start-1 flex w-full items-center justify-center bg-gray-100 p-4">
        <h2 className="flex">Header</h2>
      </header>
      {sidebar}
      <main
        className={`row-start-2 flex w-full flex-col items-center gap-8 sm:items-start ${classes?.main}`}
      >
        {children}
      </main>
    </div>
  );
};
