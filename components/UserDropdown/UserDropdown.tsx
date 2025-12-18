'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import authClient from '@/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import NavItems from '../NavItems/NavItems';
import { Button } from '../ui/button';
import type { Props } from './types';

function UserDropdown({ user, popularStocks }: Props) {
  const router = useRouter();

  function handleDeleteMeButtonClick() {
    void authClient.deleteUser(undefined, {
      onSuccess() {
        router.push('/sign-in');
      },
      onError({ error: { message } }) {
        toast.error(message);
      },
    });
  }

  function handleSignOutButtonClick() {
    void authClient.signOut(undefined, {
      onSuccess: () => {
        router.push('/sign-in');
      },
      onError: ({ error: { message } }) => {
        toast.error(message);
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-3 text-gray-400 hover:text-yellow-500"
          variant="ghost"
        >
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-yellow-500 text-sm font-bold text-yellow-900">
              {user.name.at(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-shadow-gray-400">
        <DropdownMenuLabel>
          <div className="relative flex items-center gap-3 py-2">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-yellow-500 text-sm font-bold text-yellow-900">
                {user.name.at(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <nav className="sm:hidden">
          <NavItems popularStocks={popularStocks} />
        </nav>
        <DropdownMenuSeparator className="block bg-gray-600 sm:hidden" />
        <DropdownMenuItem
          className="text-md cursor-pointer font-medium text-gray-100 transition-colors focus:bg-transparent focus:text-yellow-500"
          onClick={handleDeleteMeButtonClick}
        >
          Delete me
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-md cursor-pointer font-medium text-gray-100 transition-colors focus:bg-transparent focus:text-yellow-500"
          onClick={handleSignOutButtonClick}
        >
          <LogOut className="mr-2 hidden size-4 sm:block" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
