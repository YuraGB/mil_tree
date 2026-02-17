import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { FC, memo } from 'react';

const ButtonAuthSubmit: FC<{ title: string; disabled: boolean }> = ({
  title,
  disabled,
}) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className={disabled ? 'pointer-events-none' : ''}
    >
      {disabled ? <LoaderCircle className="animate-spin" /> : title}
    </Button>
  );
};

export default memo(ButtonAuthSubmit);
