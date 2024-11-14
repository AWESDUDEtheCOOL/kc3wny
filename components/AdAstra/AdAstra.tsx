import { Text } from '@mantine/core';

export function AdAstra() {
  return (
    <Text
      c="dimmed"
      ta="center"
      size="lg"
      maw={580}
      mx="auto"
      mt="xl"
      inherit
      variant="gradient"
      component="div" // Changed from "span" to "div" for better block-level behavior
      gradient={{ from: '#99242D', to: '#F46F60' }}
    >
      Ad Astra Per Aspera
    </Text>
  );
}
