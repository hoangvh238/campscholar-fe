import React from "react";

import { Skeleton, SkeletonProps } from "./skeleton";

export const SkeletonAvatar: React.FC<SkeletonProps> = (props) => (
  <Skeleton variant="circle" {...props} />
);

export const SkeletonText: React.FC<SkeletonProps & { lines?: number }> = ({
  lines = 1,
  ...props
}) => (
  <>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className="mb-2 h-4 w-full last:mb-0" {...props} />
    ))}
  </>
);

export const SkeletonButton: React.FC<SkeletonProps> = (props) => (
  <Skeleton className="h-10 w-24" {...props} />
);

export const SkeletonImage: React.FC<
  SkeletonProps & { aspectRatio?: string }
> = ({ aspectRatio = "16/9", ...props }) => (
  <Skeleton className="w-full" style={{ aspectRatio }} {...props} />
);

export const SkeletonCard: React.FC<SkeletonProps> = (props) => (
  <Skeleton className="w-full space-y-4 p-4" {...props}>
    <SkeletonImage />
    <SkeletonText lines={2} />
    <SkeletonButton />
  </Skeleton>
);
