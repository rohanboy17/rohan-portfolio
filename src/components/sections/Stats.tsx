import { profile, type Clip } from "@/content/profile";
import MetricCounter from "@/components/site/MetricCounter";
import Clip3D from "@/components/ui/Clip3D";
import { Item, Stagger } from "@/components/site/MotionPrimitives";

const CLIPS: Clip[] = ["coffee", "rocket", "globe", "tools"];

export default function Stats() {
  return (
    <section aria-label="Quick stats" className="px-4 sm:px-6">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {profile.stats.map((s, i) => (
          <Item key={s.label}>
            <div className="clay flex h-full flex-col items-center gap-2 rounded-[24px] p-4 text-center sm:flex-row sm:gap-4 sm:rounded-[28px] sm:p-6 sm:text-left">
              <Clip3D name={CLIPS[i % CLIPS.length]} size={52} className="h-10 w-10 sm:h-12 sm:w-12" />
              <div>
                <p className="font-display text-3xl font-semibold sm:text-4xl">
                  <MetricCounter value={s.value} />
                </p>
                <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</p>
              </div>
            </div>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
