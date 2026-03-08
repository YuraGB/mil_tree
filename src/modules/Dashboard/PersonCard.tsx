import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TPersonsRespons } from '@/types/persons';
import Link from 'next/link';

/**
 * Renders a compact person summary card with badges, title, description, and a link to the person's profile.
 *
 * @param user - Person data used to populate the card; expected properties: `id`, `name`, `statusCode`, `rank`, and `assignmentRole`.
 * @returns A JSX element containing a styled card that displays the person's `statusCode` and `rank` as badges, `name` as the title, `assignmentRole` as the description, and a "View Profile" link to `/profile/{id}`.
 */
export function PersonCard({ user }: { user: TPersonsRespons }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm gap-1 py-2">
      <CardHeader className="h-[80%]">
        <CardAction className="w-max-[20%] text-right">
          <Badge variant="secondary">{user.statusCode}</Badge>
          <Badge variant="secondary">{user.rank}</Badge>
        </CardAction>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.assignmentRole}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full cursor-pointer" asChild>
          <Link href={`/profile/${user.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
