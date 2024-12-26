import { Text } from '@mantine/core';
import { Header } from '../../components/Header/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <Text
        c="dimmed"
        ta="center"
        size="lg"
        maw={580}
        mx="auto"
        mt="xl"
        style={{
          fontFamily: 'ppEditorialNew',
          fontVariationSettings: '"wght" 200',
        }}>
        Projects test
      </Text>
    </>
  );
}
