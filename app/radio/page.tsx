import { Text } from '@mantine/core';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

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
        Radio test
      </Text>
      <Footer />
    </>
  );
}
