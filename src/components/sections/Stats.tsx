import { profile, type Clip } from "@/content/profile";
import MetricCounter from "@/components/site/MetricCounter";
import Clip3D from "@/components/ui/Clip3D";
import { Item, Stagger } from "@/components/site/MotionPrimitives";

const CLIPS: Clip[] = ["coffee", "rocket", "globe", "tools"];

export default function Stats() {
  return (
    <section aria-label="Quick stats" className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Stagger>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {profile.stats.map((s, i) => (
              <Item key={s.label}>
                <div className="clay flex h-full items-center gap-4 rounded-[28px] p-5 sm:p-6">
                  <Clip3D name={CLIPS[i % CLIPS.length]} size={52} className="hidden h-12 w-12 sm:block" />
                  <div>
                    <p className="font-display text-3xl font-semibold sm:text-4xl">
                      <MetricCounter value={s.value} />
                    </p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
