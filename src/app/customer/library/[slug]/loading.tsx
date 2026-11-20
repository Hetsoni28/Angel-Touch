import { PortalSkeleton } from '@/components/organisms/PortalSkeleton'

// Shown the instant a tab is tapped, while this screen's data loads.
export default function Loading() {
  return <PortalSkeleton variant="video" />
}
