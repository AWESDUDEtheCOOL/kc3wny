import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: '#99242D', to: '#F46F60' }}>
          KC3WNY
        </Text>
        {' '} ***** Mason Matich
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Welcome to the personal website of Mason Matich (KC3WNY), here I post my projects,
        photography, and other interesting things. Please excuse the bugs, wet paint, and
        holes in the wall, this site is under active development. In the meantime, enjoy
        the buttons!
      </Text>
    </>
  );
}
