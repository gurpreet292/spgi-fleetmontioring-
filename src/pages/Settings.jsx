import { User, Bell, Shield, Lock, Zap } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0123",
    notifyEmail: true,
    notifyPush: true,
    twoFactor: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Zap },
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Settings</h1>
      <p className="text-gray-600 text-sm md:text-base">
        Settings page for profile and preferences.
      </p>
    </div>
  );
}