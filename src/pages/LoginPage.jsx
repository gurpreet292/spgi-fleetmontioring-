import LeftPanel from "../components/LeftPanel";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-100">
      {/* On mobile: LeftPanel is just the top green banner */}
      <LeftPanel />
      {/* On mobile: LoginForm sits below the green banner, overlapping slightly */}
      <LoginForm />
    </div>
  );
}
