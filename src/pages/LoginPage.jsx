import LeftPanel from "../components/LeftPanel";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="flex min-h-[100svh] w-full flex-col eco-animate-bg lg:h-[100svh] lg:flex-row lg:overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 42%, #dcfce7 100%)",
      }}
    >
      {/* On mobile: LeftPanel is just the top green banner */}
      <LeftPanel />
      {/* On mobile: LoginForm sits below the green banner, overlapping slightly */}
      <LoginForm />
    </div>
  );
}
