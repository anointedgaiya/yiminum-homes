import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ManagementDashboard } from '@/components/management-dashboard'

export default function ManagementPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24">
        <ManagementDashboard />
      </main>
      <SiteFooter />
    </>
  )
}
