import Navbar from '@/src/common/components/Navbar';
import HeroSection from '@/src/landing/components/HeroSection';
import { AuthPublicGaurd } from '@/src/common/components/AuthGaurd';

export default function Home() {
  return (
    <AuthPublicGaurd>
      <main>
        <Navbar />
        <HeroSection />
      </main>
    </AuthPublicGaurd>
  );
}
