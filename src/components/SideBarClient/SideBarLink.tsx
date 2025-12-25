'use client';
import { TSideBarLink } from '@/types/client';
import Link from 'next/link';

export const SideBarLink = ({ url, text }: TSideBarLink) => {
  return (
    <li className="p-4 text-amber-900">
      <Link
        href={url}
        onNavigate={(e) => {
          // Only executes during SPA navigation
          console.log('Navigating...');

          // Optionally prevent navigation
          // e.preventDefault()
        }}
      >
        {text}
      </Link>
    </li>
  );
};
