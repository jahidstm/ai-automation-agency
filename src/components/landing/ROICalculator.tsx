"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Clock, DollarSign, Users, Zap } from "lucide-react";

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function useAnimatedValue(target: number, duration = 600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const from = value;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(lerp(from, target, eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(25);

  const weeklyHoursSaved = Math.round(teamSize * hoursPerDay * 5 * 0.65);
  const monthlySavings = Math.round(teamSize * hoursPerDay * 22 * hourlyRate * 0.65);
  const yearlySavings = monthlySavings * 12;
  const roiPercent = Math.round(((yearlySavings - 599) / 599) * 100);

  const animWeekly = useAnimatedValue(weeklyHoursSaved);
  const animMonthly = useAnimatedValue(monthlySavings);
  const animYearly = useAnimatedValue(yearlySavings);
  const animROI = useAnimatedValue(roiPercent);

  const sliderStyle: React.CSSProperties = {
    width: "100%",
    height: "6px",
    borderRadius: "9999px",
    appearance: "none" as const,
    WebkitAppearance: "none",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <section id="roi-calculator" style={{ padding: "5rem 1.5rem", backgroundColor: "var(--bg-subtle)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-heading)", fontSize: "0.8125rem", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em", color: "#10B981", marginBottom: "1rem",
          }}>
            <TrendingUp size={14} />
            ROI Calculator
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800, color: "var(--navy-deep)", marginBottom: "1rem", lineHeight: 1.2,
          }}>
            Calculate Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #10B981 0%, #6347FB 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Automation Savings
            </span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
            Drag the sliders to see how much time and money automation saves your team.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2.5rem",
          alignItems: "start",
        }}
        className="roi-grid"
        >
          {/* Left: Sliders */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            border: "1px solid var(--border-clean)",
            boxShadow: "0 4px 16px -2px rgba(12, 52, 74, 0.07)",
            padding: "2rem",
          }}>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem",
              color: "var(--navy-deep)", marginBottom: "1.75rem",
            }}>
              Your Business Profile
            </h3>

            {/* Team size */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label style={{
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                  color: "var(--navy-deep)", display: "flex", alignItems: "center", gap: "0.375rem",
                }}>
                  <Users size={15} color="#6347FB" /> Team Size
                </label>
                <span style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem",
                  color: "#6347FB", backgroundColor: "#EEF2FF",
                  padding: "0.15rem 0.65rem", borderRadius: "9999px",
                }}>
                  {teamSize} people
                </span>
              </div>
              <input
                id="slider-team-size"
                type="range" min={1} max={50} value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ ...sliderStyle, background: `linear-gradient(to right, #6347FB ${(teamSize - 1) / 49 * 100}%, #E2E8F0 ${(teamSize - 1) / 49 * 100}%)` }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-placeholder)", marginTop: "0.25rem" }}>
                <span>1</span><span>50</span>
              </div>
            </div>

            {/* Hours per day */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label style={{
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                  color: "var(--navy-deep)", display: "flex", alignItems: "center", gap: "0.375rem",
                }}>
                  <Clock size={15} color="#F56962" /> Manual Hours/Day
                </label>
                <span style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem",
                  color: "#F56962", backgroundColor: "#FDEEE9",
                  padding: "0.15rem 0.65rem", borderRadius: "9999px",
                }}>
                  {hoursPerDay} hrs
                </span>
              </div>
              <input
                id="slider-hours"
                type="range" min={0.5} max={8} step={0.5} value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                style={{ ...sliderStyle, background: `linear-gradient(to right, #F56962 ${(hoursPerDay - 0.5) / 7.5 * 100}%, #E2E8F0 ${(hoursPerDay - 0.5) / 7.5 * 100}%)` }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-placeholder)", marginTop: "0.25rem" }}>
                <span>0.5</span><span>8</span>
              </div>
            </div>

            {/* Hourly rate */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label style={{
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                  color: "var(--navy-deep)", display: "flex", alignItems: "center", gap: "0.375rem",
                }}>
                  <DollarSign size={15} color="#10B981" /> Avg. Hourly Rate
                </label>
                <span style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem",
                  color: "#10B981", backgroundColor: "#ECFDF5",
                  padding: "0.15rem 0.65rem", borderRadius: "9999px",
                }}>
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                id="slider-rate"
                type="range" min={10} max={150} step={5} value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                style={{ ...sliderStyle, background: `linear-gradient(to right, #10B981 ${(hourlyRate - 10) / 140 * 100}%, #E2E8F0 ${(hourlyRate - 10) / 140 * 100}%)` }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-placeholder)", marginTop: "0.25rem" }}>
                <span>$10</span><span>$150</span>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* ROI highlight */}
            <div style={{
              background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
              borderRadius: "20px",
              padding: "1.75rem",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 8px 24px -4px rgba(99, 71, 251, 0.35)",
            }}>
              <div style={{ fontSize: "0.8125rem", fontFamily: "var(--font-heading)", fontWeight: 600, opacity: 0.85, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                🏆 Estimated ROI
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "3.5rem", lineHeight: 1 }}>
                {animROI.toLocaleString()}%
              </div>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "0.375rem" }}>
                based on our Growth plan ($599 one-time)
              </div>
            </div>

            {/* Metrics grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Hours Saved/Week", value: animWeekly, unit: "hrs", icon: Clock, color: "#F56962", bg: "#FDEEE9" },
                { label: "Monthly Savings", value: animMonthly, unit: "$", icon: DollarSign, color: "#10B981", bg: "#ECFDF5" },
                { label: "Yearly Savings", value: animYearly, unit: "$", icon: TrendingUp, color: "#6347FB", bg: "#EEF2FF" },
                { label: "Tasks Automated", value: Math.round(teamSize * hoursPerDay * 22 * 4), unit: "", icon: Zap, color: "#FCB816", bg: "#FEF9E7" },
              ].map(({ label, value, unit, icon: Icon, color, bg }) => (
                <div key={label} style={{
                  backgroundColor: "#fff",
                  borderRadius: "14px",
                  border: "1px solid var(--border-clean)",
                  padding: "1.25rem",
                  boxShadow: "0 2px 8px rgba(12,52,74,0.05)",
                }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    backgroundColor: bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "0.75rem",
                  }}>
                    <Icon size={18} color={color} strokeWidth={2} />
                  </div>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.6rem",
                    color: "var(--navy-deep)", lineHeight: 1,
                  }}>
                    {unit === "$" ? `$${value.toLocaleString()}` : `${value.toLocaleString()}${unit}`}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem", fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/#contact"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                padding: "0.875rem",
                background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
                color: "#fff",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9375rem",
                borderRadius: "12px", textDecoration: "none",
                boxShadow: "0 6px 16px -2px rgba(245, 105, 98, 0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 10px 24px -4px rgba(245, 105, 98, 0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 6px 16px -2px rgba(245, 105, 98, 0.35)";
              }}
            >
              <Zap size={16} />
              Unlock These Savings — Book a Free Call
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .roi-grid { grid-template-columns: 1fr !important; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2.5px solid #6347FB;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(99,71,251,0.3);
          transition: transform 0.15s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}
