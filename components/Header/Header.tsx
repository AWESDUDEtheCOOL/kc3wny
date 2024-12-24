'use client';

import Image from 'next/image';
import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Burger, Group, Text } from '@mantine/core';
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
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
          />
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: '#99242D', to: '#F46F60' }}
            style={{
              fontFamily: 'Workbench',
              fontVariationSettings: '"BLED" 0, "SCAN" 0',
              fontSize: '40px',
            }}>
            KC3WNY
          </Text>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={['Amateur Radio', 'Satellites', 'SatCom', 'MechE', 'Projects']}
            visibleFrom="xs"
          />
          <ThemeToggle />
        </Group>
      </div>
    </header>
  );
}
