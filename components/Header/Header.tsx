'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const links = [
  { link: '/projects', label: 'Projects' },
  { link: '/radio', label: 'Amateur Radio' },
  { link: '/photos', label: 'Photo Stream' },
  { link: '/about', label: 'About' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Link href="/home">
            <Image
              src="/images/logo_wide.svg"
              alt="Logo"
              width={110}
              height={110}
              className={classes.logo}
            />
          </Link>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <ThemeToggle />
        </Group>
      </div>
    </header>
  );
}
