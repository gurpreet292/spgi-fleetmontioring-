import LeftPanel from "../components/LeftPanel";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-gray-100 lg:h-svh lg:flex-row lg:overflow-hidden">
      {/* On mobile: LeftPanel is just the top green banner */}
      <LeftPanel />
      {/* On mobile: LoginForm sits below the green banner, overlapping slightly */}
      <LoginForm />
    </div>
  );
}
