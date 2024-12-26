import { AdAstra } from '@/components/AdAstra/AdAstra';
import { Welcome } from '../../components/Welcome/Welcome';
import { Header } from '../../components/Header/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <AdAstra />
    </>
  );
}
