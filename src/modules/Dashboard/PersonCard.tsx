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
 * Render a compact person summary card with badges and a profile link.
 *
 * Displays the user's `statusCode` and `rank` as secondary badges, the user's
 * `name` as the card title, and `assignmentRole` as the description. Includes
 * a full-width "View Profile" button that links to `/profile/{user.id}`.
 *
 * @param user - The person data to display. Expected properties used: `id`, `name`, `statusCode`, `rank`, and `assignmentRole`.
 * @returns A JSX element rendering a styled card with the user's summary and a link to their profile.
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
