const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
);

const SkeletonBox = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded-[23px] ${className}`}>
    <Shimmer />
  </div>
);

const SkeletonBlock = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}>
    <Shimmer />
  </div>
);

const OpportunityCardSkeleton = () => (
  <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm space-y-3">
    <div className="flex justify-between items-center">
      <SkeletonBlock className="h-5 w-16" />
      <SkeletonBlock className="h-4 w-20" />
    </div>
    <SkeletonBlock className="h-5 w-3/4" />
    <SkeletonBlock className="h-4 w-1/2" />
    <div className="h-px bg-gray-100 my-1" />
    <SkeletonBlock className="h-3 w-24" />
    <div className="flex justify-between items-center pt-1">
      <SkeletonBlock className="h-6 w-16" />
      <SkeletonBlock className="h-8 w-20 rounded-full" />
    </div>
  </div>
);

const FrontSkeleton = () => {
  return (
    <div className="overflow-x-hidden bg-[#FAF4FE] min-h-screen font-inter">
      {/* Navbar skeleton */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-[#FAF4FE] border-b border-gray-100">
        <SkeletonBlock className="h-7 w-36" />
        <div className="hidden md:flex gap-6 items-center">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-9 w-24 rounded-full" />
        </div>
        <SkeletonBlock className="md:hidden h-8 w-8 rounded-md" />
      </nav>

      {/* Hero Section skeleton */}
      <section className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:px-64 gap-12 md:gap-10">
        {/* Left — social cards */}
        <div className="flex flex-col">
          <SkeletonBox className="h-[135px] md:min-w-[400px] mt-[26px] mx-12" />
          <SkeletonBox className="h-[135px] w-50 mt-4 mx-12 relative right-8" />
        </div>

        {/* Right — CTA */}
        <div className="flex flex-col relative mx-auto w-full md:w-64 gap-3">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-8 w-56" />
          <SkeletonBlock className="h-4 w-48 mb-2" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
          <SkeletonBlock className="h-12 w-full rounded-md" />
        </div>
      </section>

      {/* Opportunities Section skeleton */}
      <section className="relative py-16 overflow-hidden mx-4 md:mx-64 rounded-2xl mb-12 mt-2 bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm ring-1 ring-black/10">
        <div className="relative z-10 px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-10 gap-6">
            <div className="space-y-3 w-full md:w-auto">
              <SkeletonBlock className="h-9 w-64" />
              <SkeletonBlock className="h-4 w-80" />
              <SkeletonBlock className="h-4 w-56" />
            </div>
            <SkeletonBlock className="h-10 w-28 rounded-sm" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <OpportunityCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CampusX Section skeleton */}
      <section className="relative flex flex-col gap-4 mt-4 mb-8 px-8 py-6 mx-4 md:mx-64 rounded-[24px] overflow-hidden bg-gray-300 min-h-[120px]">
        <div className="relative overflow-hidden absolute inset-0 rounded-[24px]">
          <Shimmer />
        </div>
        <div className="relative z-10 space-y-3">
          <SkeletonBlock className="h-10 w-40 bg-white/30" />
          <SkeletonBlock className="h-4 w-72 bg-white/30" />
        </div>
      </section>

      {/* Footer skeleton */}
      <footer className="bg-white/50 border-t border-gray-100 px-8 py-10 mx-4 md:mx-0 mt-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonBlock className="h-5 w-24" />
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-3 w-16" />
              <SkeletonBlock className="h-3 w-20" />
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-4 w-32" />
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default FrontSkeleton;