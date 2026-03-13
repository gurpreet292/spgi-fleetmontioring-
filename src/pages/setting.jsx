import React from "react";
import "./settings.css";

const Settings = () => {
  return (
    <div className="settings-page">

      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">Manage your account and preferences</p>

      {/* Profile Information */}

      <div className="settings-card">
        <h3>Profile Information</h3>

        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input type="text" value="Admin User" readOnly />
          </div>

          <div>
            <label>Email</label>
            <input type="text" value="admin@greentrack.in" readOnly />
          </div>

          <div>
            <label>Role</label>
            <input type="text" value="Operations Manager" readOnly />
          </div>

          <div>
            <label>Company</label>
            <input type="text" value="Shree Pankaj Green Innovation Pvt Ltd" readOnly />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}

      <div className="settings-card">
        <h3>Notification Preferences</h3>

        <div className="toggle-row">
          <span>Email Alerts</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="toggle-row">
          <span>Weekly Report</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="toggle-row">
          <span>Recycling Reports</span>
          <input type="checkbox" />
        </div>

        <div className="toggle-row">
          <span>Daily Digest</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>

      {/* Dashboard Preferences */}

      <div className="settings-card">
        <h3>Dashboard Preferences</h3>

        <div className="form-grid">

          <div>
            <label>Language</label>
            <select>
              <option>English</option>
            </select>
          </div>

          <div>
            <label>Timezone</label>
            <select>
              <option>IST (UTC+5:30)</option>
            </select>
          </div>

          <div>
            <label>Units</label>
            <select>
              <option>Metric (kg, km)</option>
            </select>
          </div>

          <div>
            <label>Auto Refresh</label>
            <select>
              <option>30 seconds</option>
              <option>1 minute</option>
            </select>
          </div>

        </div>
      </div>

      <button className="save-btn">Save Settings</button>

    </div>
  );
};

export default Settings;