import { profile } from "@/content/profile";
import Clip3D from "@/components/ui/Clip3D";
import SocialIcon from "@/components/ui/SocialIcon";
import ContactForm from "@/components/site/ContactForm";
import CopyEmail from "@/components/site/CopyEmail";
import { Reveal } from "@/components/site/MotionPrimitives";

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="clay relative overflow-hidden rounded-[32px] p-5 sm:rounded-[40px] sm:p-10 lg:p-14">
          <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-lilac/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-peach/20 blur-3xl" />

          {/* grid-cols-1 + min-w-0 keep long content (email, buttons) from widening the column on phones */}
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal className="min-w-0">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="flex gap-2">
                  <Clip3D name="mail" size={64} float className="h-14 w-14 sm:h-16 sm:w-16" />
                  <Clip3D name="party" size={56} float delay={0.8} tilt={10} className="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Contact</p>
                <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                  Let&apos;s build something <span className="text-gradient">great</span> together.
                </h2>
                <p className="mt-4 max-w-md text-pretty text-muted sm:text-lg">
                  Hiring for a full-stack role, or have a product to ship? I usually reply within a day.
                </p>
                <div className="mt-7 w-full max-w-md">
                  <CopyEmail email={profile.email} />
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {profile.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2.5 text-sm transition hover:bg-white/10"
                    >
                      <SocialIcon icon={s.icon} size={15} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0">
              <div className="rounded-[24px] border border-line bg-ink/60 p-4 backdrop-blur-md sm:rounded-[28px] sm:p-7">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
