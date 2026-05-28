import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";

const VMS = 8;
const SLOTS = 16;
const CELLS = VMS * SLOTS;

function pickActiveStatic(seed: number): boolean[] {
  /* Static-sized workers: each VM has a fixed concurrency. Most workloads only
   * use ~25% of the slots that were booked. Cells lit cycle slowly. */
  const out = new Array(CELLS).fill(false);
  for (let v = 0; v < VMS; v++) {
    const phase = (seed * 0.31 + v * 0.7) % 1;
    const lit = Math.round(SLOTS * (0.18 + 0.12 * (0.5 + 0.5 * Math.sin(phase * Math.PI * 2))));
    for (let s = 0; s < SLOTS; s++) {
      if (s < lit) out[v * SLOTS + s] = true;
    }
  }
  return out;
}

function pickActiveBurla(seed: number): boolean[] {
  /* Burla adaptive: concurrency adapts per VM, idle slots get speculatively
   * filled. We model ~85% utilization with cells continuously turning over. */
  const out = new Array(CELLS).fill(false);
  for (let v = 0; v < VMS; v++) {
    const phase = (seed * 0.42 + v * 1.3) % 1;
    const lit = Math.round(
      SLOTS * (0.82 + 0.10 * (0.5 + 0.5 * Math.sin(phase * Math.PI * 2)))
    );
    const offset = Math.floor((seed * 1.7 + v * 3) % SLOTS);
    for (let s = 0; s < lit; s++) {
      out[v * SLOTS + ((s + offset) % SLOTS)] = true;
    }
  }
  return out;
}

function utilization(cells: boolean[]): number {
  return cells.filter(Boolean).length / cells.length;
}

export function DynamicHardware() {
  const [tick, setTick] = useState(0);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = document.getElementById("dynamic-hardware");
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.some((e) => e.isIntersecting) && setArmed(true),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!armed) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 520);
    return () => clearInterval(id);
  }, [armed]);

  const staticCells = useMemo(() => pickActiveStatic(tick), [tick]);
  const burlaCells = useMemo(() => pickActiveBurla(tick), [tick]);
  const staticUtil = Math.round(utilization(staticCells) * 100);
  const burlaUtil = Math.round(utilization(burlaCells) * 100);

  return (
    <section
      id="dynamic-hardware"
      className="section bg-onyx relative !py-24 md:!py-28"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-7 md:mb-9">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow mb-5">Dynamic Hardware</div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="h-section text-balance">
                Industry average cloud CPU utilization is{" "}
                <span className="underline-accent">under 25%</span>.
                <br />
                Burla runs at 2 to 5x higher.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <p className="lead text-pretty">
                Three of every four dollars on your cloud bill is lit on fire.
                Burla vertically scales concurrency per VM in real time and
                horizontally scales VMs in and out. Heavy tasks get more
                room, idle space gets filled speculatively.
              </p>
              <a
                href="https://burla.dev/blog/dynamic-hardware"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-5"
              >
                The full mechanism, on the blog
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120} y={20}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ClusterPanel
              title="Static, fixed-size workers"
              kind="static"
              cells={staticCells}
              util={staticUtil}
              caption="Idle slots stay idle. Right-sizing is a one-shot guess."
            />
            <ClusterPanel
              title="Burla · adaptive concurrency"
              kind="burla"
              cells={burlaCells}
              util={burlaUtil}
              caption="Slots fill speculatively. Concurrency adapts to real CPU and memory pressure."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClusterPanel({
  title,
  kind,
  cells,
  util,
  caption,
}: {
  title: string;
  kind: "static" | "burla";
  cells: boolean[];
  util: number;
  caption: string;
}) {
  const utilColor = kind === "burla" ? "text-accent" : "text-error/80";
  const litColor = kind === "burla" ? "bg-accent" : "bg-blue";
  return (
    <div className="surface-elev">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-6">
        <span className="mono text-[13px] text-ink">{title}</span>
        <span
          className={`mono text-[12px] uppercase tracking-eyebrow ${
            kind === "burla" ? "text-accent" : "text-inkSubtle"
          }`}
        >
          {kind === "burla" ? "dynamic" : "fixed"}
        </span>
      </div>
      <div className="px-5 py-5 md:px-7 md:py-6">
        <div className="mb-4">
          <div className="stat-label">cluster utilization</div>
          <div className={`mt-1 font-display font-medium text-[36px] tnum tracking-tighter2 ${utilColor}`}>
            {util}%
          </div>
        </div>

        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${SLOTS}, minmax(0, 1fr))` }}
        >
          {cells.map((on, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[2px] transition-colors duration-500 ${
                on ? litColor : "bg-line/80"
              }`}
              style={{ transitionDelay: on ? `${(i % 9) * 10}ms` : "0ms" }}
            />
          ))}
        </div>

        <div className="hairline mt-4 pt-3">
          <p className="body-base text-[13px] text-pretty">{caption}</p>
        </div>
      </div>
    </div>
  );
}
