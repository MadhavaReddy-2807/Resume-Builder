import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { SignOutButton } from '@clerk/clerk-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MoreHorizontal, MoreHorizontalIcon } from 'lucide-react';


const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [signed, setSigned] = useState(0);

  useEffect(() => {
    setSigned(isSignedIn ? 1 : 0);
  }, [isSignedIn]);

  return (
    <div className="shadow-md p-2 flex justify-between mb-2 border-white border-b-[1px]">
      <Link to={'/'}>
      <div className="flex gap-4">
        <img src="/logo.svg" height={10} width={40} alt="Logo" />
        <span className="font-bold text-xl mt-1 text-blue-500">Resume Builder</span>
      </div></Link>
      <div className='flex gap-4 items-center'>
        {!signed ? <div className='md:hidden'> <Link to={'/login'} ><Button>Get Started</Button></Link></div> : <div className='md:hidden'> <DropdownMenu>
          <DropdownMenuTrigger className="text-2xl text-black ">☰</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Link to={'/dashboard'}><Button variant="outline">DashBoard</Button></Link></DropdownMenuItem>
            <DropdownMenuItem className="flex justify-center"><SignOutButton/></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>}
        <Link to={signed ? '/dashboard' : '/login'}>
          <Button className="border hidden md:block ">
          {signed ? 'Dashboard' : 'Get Started'}</Button>
        </Link>

        <span className={signed ? ' mt-1 hidden md:block ' : 'hidden'}><UserButton /></span>
      </div>

    </div>
  );
};

export default Header;
