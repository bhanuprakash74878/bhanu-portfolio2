import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { LoadingScreen } from "@/components/loading-screen"
import { AmbientCursor } from "@/components/ambient-cursor"
import { AiAssistant } from "@/components/ai-assistant"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Certifications } from "@/components/sections/certifications"
import { Achievements } from "@/components/sections/achievements"
import { Services } from "@/components/sections/services"
import { Resume } from "@/components/sections/resume"
import { CurrentlyLearning } from "@/components/sections/currently-learning"
import { Goals } from "@/components/sections/goals"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <AmbientCursor />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Services />
        <Resume />
        <CurrentlyLearning />
        <Goals />
        <Contact />
      </main>
      <SiteFooter />
      <AiAssistant />
    </>
  )
}
