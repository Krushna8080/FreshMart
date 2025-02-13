interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={`skeleton rounded-md ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg">
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Skeleton className="h-96 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
} 