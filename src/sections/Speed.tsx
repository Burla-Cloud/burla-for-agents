import { useEffect, useState } from "react";
import { Reveal } from "../components/Reveal";

interface IterTiming {
  label: string;
  withBurla: number;
  withoutBurla: number;
}

const TIMINGS: IterTiming[] = [
  { label: "call #1", withBurla: 0.4, withoutBurla: 92 },
  { label: "call #2", withBurla: 0.5, withoutBurla: 88 },
  { label: "call #3", withBurla: 0.6, withoutBurla: 97 },
];

const MAX_BAR_SEC = 100;

// Pause between replay cycles. Long enough that viewers can read the final
// "92s wait" / "0.4s · running" labels before the bars reset.
const REPLAY_HOLD_MS = 5_300;

function useReplay(active: boolean, totalMs = 4400) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let loopTimeout: number | null = null;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / totalMs);
        setT(p);
        if (p < 1) raf = requestAnimationFrame(tick);
        else loopTimeout = window.setTimeout(run, REPLAY_HOLD_MS);
      };
      raf = requestAnimationFrame(tick);
    };
    run();
    return () => {
      cancelAnimationFrame(raf);
      if (loopTimeout) clearTimeout(loopTimeout);
    };
  }, [active, totalMs]);
  return t;
}

export function Speed() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.some((e) => e.isIntersecting) && setArmed(true),
      { threshold: 0.05 }
    );
    const el = document.getElementById("speed");
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const t = useReplay(armed);

  return (
    <section id="speed" className="section bg-onyx relative">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-5">Speed</div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="h-section text-balance">
                Every Burla call deploys in{" "}
                <span className="text-accent">under a second</span>. Every
                time.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lead mt-7 max-w-[520px] text-pretty">
                Most distributed runtimes make you wait around 90 seconds for
                a VM to boot on each submit. Burla only waits once, when the
                cluster warms up. After that, every call the agent makes
                deploys in under a second, so the agent can constantly
                iterate instead of sitting there waiting on infrastructure.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={180} y={20}>
              <div className="surface-elev overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5 md:px-6">
                  <span className="mono text-[12px] text-inkSubtle">
                    time-to-first-task · seconds
                  </span>
                  <span className="chip-live">
                    <span className="live-dot" />
                    Replaying
                  </span>
                </div>

                <div className="px-5 py-6 md:px-7 md:py-7">
                  <div className="grid grid-cols-12 gap-4 mb-2 text-[11px] font-medium uppercase tracking-eyebrow text-inkSubtle">
                    <div className="col-span-2">call</div>
                    <div className="col-span-10 flex justify-between">
                      <span>0s</span>
                      <span>25s</span>
                      <span>50s</span>
                      <span>75s</span>
                      <span>100s</span>
                    </div>
                  </div>

                  <div className="space-y-5 mt-3">
                    {TIMINGS.map((row, i) => {
                      const delay = i * 0.18;
                      const localT = Math.max(0, Math.min(1, (t - delay) * 2.2));
                      const burlaWidth = Math.min(
                        100,
                        ((row.withBurla * localT) / MAX_BAR_SEC) * 100
                      );
                      const otherWidth = Math.min(
                        100,
                        ((row.withoutBurla * localT) / MAX_BAR_SEC) * 100
                      );
                      const done = localT >= 1;
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-4 items-center"
                        >
                          <div className="col-span-2 mono text-[12px] text-inkMuted whitespace-nowrap">
                            {row.label}
                          </div>
                          <div className="col-span-10 space-y-2">
                            <BarRow
                              label="without"
                              widthPct={otherWidth}
                              seconds={row.withoutBurla * localT}
                              barClass="bg-ink/25"
                              labelClass="text-inkSubtle"
                              done={done}
                              finalText={`${row.withoutBurla.toFixed(0)}s wait`}
                              kind="slow"
                            />
                            <BarRow
                              label="with"
                              widthPct={burlaWidth}
                              seconds={row.withBurla * localT}
                              barClass="bg-accent"
                              labelClass="text-accent"
                              done={done}
                              finalText={`${row.withBurla.toFixed(1)}s · running`}
                              kind="fast"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="hairline mt-8 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="stat-label">Idle time the agent burns</div>
                      <div className="mt-3 space-y-1.5 mono text-[13px]">
                        <div className="flex items-baseline gap-3">
                          <span className="text-inkMuted w-[88px] tnum">
                            ~3 min
                          </span>
                          <span className="text-inkSubtle">
                            per session, without Burla
                          </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-accent w-[88px] tnum">
                            ~1.5 sec
                          </span>
                          <span className="text-inkSubtle">
                            per session, with Burla
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="stat-label">How Burla does it</div>
                      <div className="body-base mt-3 text-[14px] text-pretty">
                        The cluster lives in your cloud as a warm pool. The
                        agent calls{" "}
                        <span className="mono text-ink">
                          remote_parallel_map
                        </span>{" "}
                        and code is running on the fleet a heartbeat later.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarRow({
  label,
  widthPct,
  seconds,
  barClass,
  labelClass,
  done,
  finalText,
  kind,
}: {
  label: string;
  widthPct: number;
  seconds: number;
  barClass: string;
  labelClass: string;
  done: boolean;
  finalText: string;
  kind: "fast" | "slow";
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[72px] shrink-0">
        <span
          className={`mono text-[11px] uppercase tracking-eyebrow whitespace-nowrap ${labelClass}`}
        >
          {label}
        </span>
      </div>
      <div className="flex-1 relative h-4">
        <div className="absolute inset-y-0 left-0 right-0 rounded-sm bg-line/40" />
        <div
          className={`absolute inset-y-0 left-0 rounded-sm ${barClass}`}
          style={{ width: `${widthPct}%` }}
        />
        {kind === "fast" && widthPct > 0 && (
          <div
            className="absolute -top-[2px] h-[20px] w-[2px] bg-accent"
            style={{ left: `${widthPct}%` }}
          />
        )}
      </div>
      <div className="w-[104px] shrink-0 text-right mono text-[12px] tnum whitespace-nowrap">
        {done ? (
          <span className={kind === "fast" ? "text-accent" : "text-inkMuted"}>
            {finalText}
          </span>
        ) : (
          <span className="text-inkSubtle">
            {seconds.toFixed(seconds < 10 ? 1 : 0)}s
          </span>
        )}
      </div>
    </div>
  );
}
