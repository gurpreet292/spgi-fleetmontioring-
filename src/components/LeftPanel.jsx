import { FaRecycle, FaLeaf } from "react-icons/fa";
import { FiTrendingDown } from "react-icons/fi";
import logo from "../assets/spgi-logo.png";

const features = [
  {
    icon: <FaRecycle className="text-3xl text-white" />,
    label: "Recycle",
    desc: "Close the loop on materials",
  },
  {
    icon: <FaLeaf className="text-3xl text-white" />,
    label: "Renew",
    desc: "Restore natural resources",
  },
  {
    icon: <FiTrendingDown className="text-3xl text-white" />,
    label: "Reduce",
    desc: "Minimize waste at the source",
  },
];

export default function LeftPanel() {
  return (
    <div
      className="relative flex w-full flex-col overflow-hidden eco-animate-bg lg:h-[100svh] lg:w-1/2"
      style={{ background: "linear-gradient(140deg, #14532d 0%, #166534 46%, #0f766e 100%)" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
      />
      <div
        className="absolute top-1/2 -left-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      />

      {/* ── MOBILE BANNER (hidden on lg+) ── */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-10 pt-8 lg:hidden">
        <img src={logo} alt="SPGI Logo" className="w-24 h-24 object-contain mb-4" />
        <h2 className="text-3xl font-extrabold text-white tracking-wide">SPGI</h2>
        <p
          className="text-xs font-bold tracking-widest uppercase mt-2 text-center"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Transforming Waste Into Sustainable Value
        </p>
      </div>

      {/* ── DESKTOP FULL PANEL (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-between px-10 py-10">
        {/* Logo */}
        <div className="relative z-10 mt-4 flex w-full flex-col items-center gap-0">
          <img
            src={logo}
            alt="SPGI Logo"
            className="h-24 w-24 object-contain"
          />
          <span
            className="text-lg font-semibold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Shree Pankaj Green Innovation
          </span>
        </div>

        {/* Heading */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl font-extrabold leading-tight text-white drop-shadow-md lg:text-[2.5rem]">
            Transforming Waste Into
            <span className="block text-emerald-200"> Sustainable Value</span>
          </h1>
          <p
            className="mx-auto mt-3 max-w-sm text-base leading-relaxed lg:text-[1.05rem]"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Empowering the circular economy through intelligent resource
            management.
          </p>
        </div>

        {/* Feature Icons */}
        <div className="relative z-10 mb-4 grid w-full max-w-sm grid-cols-3 gap-3">
          {features.map(({ icon, label, desc }) => (
            <div
              key={label}
              className="flex cursor-default flex-col items-center gap-2 rounded-2xl p-3.5 backdrop-blur-sm transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")
              }
            >
              {icon}
              <span className="text-white font-bold text-sm">{label}</span>
              <span
                className="text-xs text-center leading-tight"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
