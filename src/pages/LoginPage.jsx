import LeftPanel from "../components/LeftPanel";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen w-full page-open-animate eco-animate-bg"
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
