import type { Metadata } from 'next'
import { MaterialAnalysis } from '@/components/material-analysis'

export const metadata: Metadata = {
  title: 'Calculations & Material Analysis — Yiminum Homes',
  description: 'Plan construction quantities, material costs and project estimates.',
}

export default function CalculationsPage() {
  return <MaterialAnalysis />
}