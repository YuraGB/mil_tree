import { Accordion } from '@/components/ui/accordion';
import { useOrders } from './hooks/useOrders';
import { AccordionOrder } from '@/components/AccordionOrder';

export const Orders = () => {
  const { orders } = useOrders();

  return (
    <article>
      <Accordion type="single" collapsible>
        {orders.map((order) => (
          <AccordionOrder key={order.id} order={order} />
        ))}
      </Accordion>
    </article>
  );
};
