export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to your {role} dashboard.</p>
      </div>

      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Dashboard Content Coming Soon</h2>
        <p className="text-gray-600">This section is being prepared by the team. Check back soon!</p>
      </div>
    </div>
  );
}
