import { IWidgetProps } from '@/types';
import WidgetContainer from '../WidgetConteiner';
import { AwardsSelector } from '@/modules/Awards';
import { useAwards } from '@/modules/Awards/hooks/useAwards';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AWARDS } from '@/constants';
import { Activity } from 'react';

export const AwardsSelectorWidget = ({
  removeWidget,
  saveWidget,
  widget,
}: IWidgetProps) => {
  const { form, onSubmit, currentSelectedAward } = useAwards((awardName) => {
    const widgetProps = widget.props ?? {};

    // Гарантуємо, що awards — масив рядків
    let awards: string = Array.isArray(widgetProps.awards)
      ? widgetProps.awards.join()
      : '';

    awards += ' ' + awardName;

    saveWidget(widget.id, { awards });
  });
  return (
    <WidgetContainer
      onRemoveHandler={removeWidget}
      widgetId={widget.id}
      widgetName={widget.type}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-2 w-full space-y-6 rounded border p-4"
        >
          <FormField
            control={form.control}
            name="award_selector"
            render={({ field }) => (
              <FormItem>
                <AwardsSelector
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Activity mode={!!currentSelectedAward ? 'visible' : 'hidden'}>
            <Button className="my-4 flex">Save Award</Button>
          </Activity>
        </form>
      </Form>

      {widget.props?.awards && (
        <div className="mt-4">
          {widget.props.awards
            .split(' ')
            .map((awardName: string, index: number) => {
              return (
                <div
                  key={awardName + index}
                  className="mb-2 flex items-center space-x-2"
                >
                  <span className="text-xl">
                    {AWARDS.find((award) => award.name === awardName)?.icon}
                  </span>
                  <span className="capitalize">
                    {AWARDS.find((award) => award.name === awardName)?.title}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </WidgetContainer>
  );
};
