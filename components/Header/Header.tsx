'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Burger, Drawer, Group } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import classes from './Header.module.css';

const links = [
  { link: '/home', label: 'Home' },
  { link: '/projects', label: 'Projects' },
  { link: '/radio', label: 'Amateur Radio' },
  { link: '/photos', label: 'Photo Stream' },
  { link: '/about', label: 'About' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const items = links.map((link) => {
    if (!isMobile && link.label === 'Home') return null;

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {isMobile && (
            <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
          )}
          <Link href="/home">
            <Image src="/images/logo_wide.svg" alt="Logo" width={110} height={110} />
          </Link>
        </Group>

        <Group>
          {!isMobile && (
            <Group ml={50} gap={5} className={classes.links}>
              {items}
            </Group>
          )}
          <ThemeToggle />
        </Group>
      </div>

      {isMobile && (
        <Drawer
          opened={opened}
          onClose={close}
          size="auto"
          padding="md"
          title="Navigation"
          className={classes.drawer}
        >
          <nav className={classes.mobileNav}>{items}</nav>
        </Drawer>
      )}
    </header>
  );
}
