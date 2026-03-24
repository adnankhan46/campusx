export function LoadingOpportunity() {
  return (
    <div className="mt-3 w-full">
      <div className="overflow-hidden border border-gray-200 rounded-lg bg-white animate-pulse">

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-5 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="h-5 w-16 bg-gray-200 rounded-md" />
              <div className="h-5 w-12 bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-2 space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="h-3 bg-gray-200 rounded w-28" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t bg-gray-50 p-4">
          <div className="h-8 w-20 bg-gray-200 rounded-md" />
          <div className="h-8 w-24 bg-gray-200 rounded-lg" />
        </div>

      </div>
    </div>
  );
}