import { workProcess } from "@/content/profile";
import { Item, Stagger } from "@/components/site/MotionPrimitives";

/** The six-step way every client project runs. */
export default function ProcessSteps() {
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {workProcess.map((step, i) => (
        <Item key={step.title} className="h-full">
          <div className="clay h-full rounded-3xl p-5 sm:p-6">
            <p className="font-display text-sm font-semibold text-lilac">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">{step.body}</p>
          </div>
        </Item>
      ))}
    </Stagger>
  );
}
