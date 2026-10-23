import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import ClientProof from "@/components/sections/ClientProof";
import Pricing from "@/components/sections/Pricing";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Contact from "@/components/sections/Contact";

// Re-render at most once a day so the GitHub section stays fresh.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <ClientProof />
      <About />
      <Skills />
      <Projects />
      <Pricing />
      <Experience />
      <GitHubActivity />
      <Contact />
    </>
  );
}
