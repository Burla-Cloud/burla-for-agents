import { useEffect, useState } from "react";
import { Reveal } from "../components/Reveal";

interface Workload {
  name: string;
  baseline: number;
  burla: number;
  unit: string;
  hint: string;
}

const WORKLOADS: Workload[] = [
  {
    name: "Trillion-row Parquet scan",
    baseline: 38.4,
    burla: 8.91,
    unit: "$",
    hint: "2.4TB · 76s",
  },
  {
    name: "Image embeddings · 50M",
    baseline: 412,
    burla: 142,
    unit: "$",
    hint: "GPU · 11h → 4h",
  },
  {
    name: "Document parsing · 800k PDFs",
    baseline: 91,
    burla: 27,
    unit: "$",
    hint: "func_ram=\"dynamic\"",
  },
  {
    name: "Genomic IDAT → PGEN · 1k samples",
    baseline: 184,
    burla: 38,
    unit: "$",
    hint: "1,000 CPUs · 9 min",
  },
];

export function Efficiency() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = document.getElementById("efficiency");
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.some((e) => e.isIntersecting) && setArmed(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="efficiency" className="section bg-onyx relative">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-5">Efficiency</div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="h-section text-balance">
                The same job costs{" "}
                <span className="text-accent">50 to 80% less</span>.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lead mt-7 max-w-[480px] text-pretty">
                Burla packs workers tighter when CPU and memory are free,
                and backs off when they aren't. Your function doesn't hit
                OOM errors and you're utilizing more compute. You're about
                to make your finance department a lot happier.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120} y={16}>
              <div className="surface-elev overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5 md:px-6">
                  <span className="mono text-[13px] text-ink">
                    cost per job · usd
                  </span>
                  <div className="flex items-center gap-5 text-[11px] mono">
                    <span className="flex items-center gap-2 text-inkSubtle">
                      <span className="h-2 w-2 rounded-sm bg-line" /> baseline
                    </span>
                    <span className="flex items-center gap-2 text-accent">
                      <span className="h-2 w-2 rounded-sm bg-accent" /> burla
                    </span>
                  </div>
                </div>
                <div className="px-5 py-6 md:px-7 md:py-8 space-y-7">
                  {WORKLOADS.map((w, i) => (
                    <WorkloadRow key={w.name} w={w} armed={armed} order={i} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkloadRow({
  w,
  armed,
  order,
}: {
  w: Workload;
  armed: boolean;
  order: number;
}) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!armed) return;
    const delay = order * 160;
    const dur = 1100;
    const id = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setT(eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [armed, order]);

  // Per-row scaling: each row's baseline = 100% width, burla bar is the ratio.
  // Cross-row dollar comparison is preserved by the dollar labels on the right;
  // visualizing each row at the same scale would shrink the smaller wins into
  // invisible stubs and undersell the savings story.
  const baselinePct = 100;
  const burlaPct = (w.burla / w.baseline) * 100;
  const savings = Math.round(((w.baseline - w.burla) / w.baseline) * 100);
  // Format dollars by intent: only use decimals when the source value itself
  // has fractional cents (so $91 reads as "$91", not "$91.00").
  const fmt = (animated: number, source: number) =>
    source % 1 !== 0 ? animated.toFixed(2) : Math.round(animated).toString();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-ink text-[14px]">{w.name}</span>
        <span className="mono text-[11px] text-inkSubtle">{w.hint}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative h-6 bg-line/20 rounded-sm overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-line transition-[width] duration-700"
              style={{ width: `${baselinePct * t}%` }}
            />
          </div>
          <div className="mono text-[12px] tnum w-[64px] text-right text-inkMuted">
            ${fmt(w.baseline * t, w.baseline)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative h-6 bg-line/20 rounded-sm overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-700"
              style={{ width: `${burlaPct * t}%` }}
            />
            {t >= 0.98 && (
              <span
                className="absolute inset-y-0 flex items-center mono text-[11px] text-accent font-semibold pl-2"
                style={{
                  left: `${Math.min(94, burlaPct + 1.5)}%`,
                }}
              >
                −{savings}%
              </span>
            )}
          </div>
          <div className="mono text-[12px] tnum w-[64px] text-right text-accent">
            ${fmt(w.burla * t, w.burla)}
          </div>
        </div>
      </div>
    </div>
  );
}
