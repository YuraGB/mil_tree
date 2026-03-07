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
