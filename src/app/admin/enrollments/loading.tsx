import { AdminSkeleton } from '@/components/organisms/AdminSkeleton'

// Shown the instant this admin screen is opened, while its data loads.
export default function Loading() {
  return <AdminSkeleton variant="table" />
}
