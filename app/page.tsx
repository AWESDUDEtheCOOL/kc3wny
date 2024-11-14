import { AdAstra } from '@/components/AdAstra/AdAstra';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <AdAstra />
    </>
  );
}
