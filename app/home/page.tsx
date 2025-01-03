import { AdAstra } from '@/components/AdAstra/AdAstra';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Welcome } from '../../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <AdAstra />
      <Footer />
    </>
  );
}
