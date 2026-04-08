export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="text-center">
        <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 animate-pulse">
          G
        </div>
        <p className="text-slate-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}