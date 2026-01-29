export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-700">
        <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-900 animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}

