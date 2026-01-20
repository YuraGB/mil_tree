import { TOrders } from '@/types/orders';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const AccordionOrder = ({ order }: { order: TOrders }) => {
  return (
    <AccordionItem value={order.id}>
      <AccordionTrigger>
        <span>{order.type}</span>
        <span>{order.craetedAt}</span>
      </AccordionTrigger>
      <AccordionContent>
        <section>
          <p>
            <strong>From What Date:</strong> {order.fromWhatDate}
          </p>
          <p>
            <strong>Who Ordered:</strong> {order.whoOrdered.name} (
            {order.whoOrdered.rank})
          </p>
          <p>
            <strong>On Which Name:</strong> {order.onWhichName.name} (
            {order.onWhichName.rank})
          </p>
          <p>
            <strong>Description:</strong> {order.description}
          </p>
          <p>
            <strong>Created At:</strong> {order.craetedAt}
          </p>
        </section>
      </AccordionContent>
    </AccordionItem>
  );
};
