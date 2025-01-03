'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconBrandBluesky, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { ActionIcon, Group, Text } from '@mantine/core';
import classes from './Footer.module.css';

const links = [
  { link: 'mailto:mcmatich@gmail.com', label: 'Contact' },
  { link: '/about', label: 'About' },
];

export function Footer() {
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      style={{ textDecoration: 'none' }}
    >
      <Text component="span" size="14" lh={1}>
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Image src="/images/logo_wide.svg" alt="Logo" width={70} height={32.5} />

        <Group className={classes.copyright}>© 2025 Mason Matich. All rights reserved.</Group>

        <Group className={classes.copyright}>Made on &#127758; EARTH using next.js & mantine</Group>

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <Link
            href="https://www.linkedin.com/in/mason-matich"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="md" variant="default" radius="xl">
              <IconBrandLinkedin size={14} stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link
            href="https://bsky.app/profile/kc3wny.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="md" variant="default" radius="xl">
              <IconBrandBluesky size={14} stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link href="https://github.com/AWESDUDEtheCOOL" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="md" variant="default" radius="xl">
              <IconBrandGithub size={14} stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
      </div>
    </div>
  );
}
