import { FaRecycle, FaLeaf } from "react-icons/fa";
import { FiTrendingDown } from "react-icons/fi";
import logo from "../assets/images/logo.webp";

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
      className="relative overflow-hidden w-full lg:w-1/2 lg:min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #10b981 100%)" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
      />
      <div
        className="absolute bottom-10 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
      />
      <div
        className="absolute top-1/2 -left-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      />

      {/* ── MOBILE BANNER (hidden on lg+) ── */}
      <div className="relative z-10 flex flex-col items-center pt-10 pb-14 px-6 lg:hidden">
        {/* Logo box */}
        <div className="bg-white rounded-2xl p-3 shadow-lg mb-4">
          <img src={logo} alt="SPGI Logo" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-wide">SPGI</h2>
        <p
          className="text-xs font-bold tracking-widest uppercase mt-2 text-center"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Transforming Waste Into Sustainable Value
        </p>
      </div>

      {/* ── DESKTOP FULL PANEL (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-col items-center justify-between flex-1 px-10 pt-12 pb-0">
        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center gap-0 w-full mt-8">
          <img
            src={logo}
            alt="SPGI Logo"
            className="w-24 h-24 object-contain"
          />
          <span
            className="text-lg font-semibold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            GreenInnovations
          </span>
        </div>

        {/* Heading */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
            Transforming Waste Into
            <span className="block text-emerald-200"> Sustainable Value</span>
          </h1>
          <p
            className="mt-4 text-base lg:text-lg leading-relaxed max-w-sm mx-auto"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Empowering the circular economy through intelligent resource
            management.
          </p>
        </div>

        {/* Feature Icons */}
        <div className="relative z-10 grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
          {features.map(({ icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 backdrop-blur-sm rounded-2xl p-4 transition-colors cursor-default"
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
