"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import {
  Avatar,
  Button,
  DropdownMenu,
  Text,
} from "@radix-ui/themes";
import { Skeleton, ThemeToggle } from "./components";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {

  return (
    <nav className="flex justify-between items-center border-b px-5 h-14 w-full max-w-full overflow-hidden ">
        {/* Left side items */}
        <div className="flex space-x-6 items-center">
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLink />
        </div>

        {/* Right side items */}
     
      <AuthStatus/>
    </nav>
  );  
};

const NavLink = () => {
  const currentPathname = usePathname();
  console.log(currentPathname);

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
    { label: "Board", href: "/board" },
  ];
  return (
    <ul className="flex hover:cursor-pointer gap-6">
      {links.map((link) => (
        <li key={link.href} >
          <Link
            href={link.href}
            className={classnames({
              "nav-link": true,
              "text-zinc-900 font-bold": link.href === currentPathname,
              "dark:text-white": link.href !== currentPathname,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div>
        <Skeleton/>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex gap-3">
        <Button onClick={() => signIn()}>Log in</Button>  
        <Button>Sign Up</Button>
         <ThemeToggle />
      </div>
     
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Button onClick={() => signOut()}>Log out</Button>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/profile">
                <Button>Profile</Button>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
