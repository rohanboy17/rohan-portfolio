import { profile } from "@/content/profile";
import Clip3D from "@/components/ui/Clip3D";
import SocialIcon from "@/components/ui/SocialIcon";
import ContactForm from "@/components/site/ContactForm";
import CopyEmail from "@/components/site/CopyEmail";
import { Reveal } from "@/components/site/MotionPrimitives";

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="clay relative overflow-hidden rounded-[40px] p-6 sm:p-10 lg:p-14">
          <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-lilac/25 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-peach/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="flex gap-2">
                  <Clip3D name="mail" size={64} float />
                  <Clip3D name="party" size={56} float delay={0.8} tilt={10} />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-lilac">Contact</p>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  Let&apos;s build something <span className="text-gradient">great</span> together.
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted">
                  Hiring for a full-stack role, or have a product to ship? I usually reply within a day.
                </p>
                <div className="mt-8">
                  <CopyEmail email={profile.email} />
                </div>
                <div className="mt-6 flex gap-2">
                  {profile.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
                    >
                      <SocialIcon icon={s.icon} size={15} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[28px] border border-line bg-ink/60 p-5 backdrop-blur-md sm:p-7">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
