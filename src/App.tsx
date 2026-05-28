import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Speed } from "./sections/Speed";
import { Scale } from "./sections/Scale";
import { MentalModel } from "./sections/MentalModel";
import { DynamicHardware } from "./sections/DynamicHardware";
import { Efficiency } from "./sections/Efficiency";
import { DynamicSizing } from "./sections/DynamicSizing";
import { SystemPrompt } from "./sections/SystemPrompt";
import { OpenSource } from "./sections/OpenSource";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main className="bg-onyx text-ink">
        <Hero />
        <Speed />
        <Scale />
        <MentalModel />
        <DynamicHardware />
        <Efficiency />
        <DynamicSizing />
        <SystemPrompt />
        <OpenSource />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
