import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skeleton Loading */}
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="h-6 w-24 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-2 animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="fixed bottom-8 right-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    </div>
  );
} 