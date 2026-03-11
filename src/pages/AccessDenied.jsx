export default function AccessDenied() {

  return (
    <div className="flex items-center justify-center h-screen">

      <div className="text-center">

        <h1 className="text-3xl font-bold text-red-600">
          Access Denied
        </h1>

        <p className="mt-2 text-gray-600">
          You do not have permission to access this page.
        </p>

      </div>

    </div>
  );
}