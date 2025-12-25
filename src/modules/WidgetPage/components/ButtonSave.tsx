import { Button } from '@/components/ui/button';
import { memo } from 'react';

export const ButtonSave = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} className="my-4 flex">
      Save Page
    </Button>
  );
});
