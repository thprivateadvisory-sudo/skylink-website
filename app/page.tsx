import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Vision } from '@/components/sections/Vision';
import { Advantages } from '@/components/sections/Advantages';
import { Cities } from '@/components/sections/Cities';
import { Compliance } from '@/components/sections/Compliance';
import { Invest } from '@/components/sections/Invest';
import { Footer } from '@/components/sections/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <HowItWorks />
        <Vision />
        <Advantages />
        <Cities />
        <Compliance />
        <Invest />
      </main>
      <Footer />
    </>
  );
}
