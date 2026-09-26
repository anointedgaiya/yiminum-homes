"use client"

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Hammer,
  Home,
  Mail,
  Phone,
  Users,
  Wrench,
} from 'lucide-react'

type ManagementTab = 'overview' | 'agents'

const homeAgents = [
  { name: 'Amara Okafor', email: 'amara@yiminumhomes.com', phone: '+234 803 555 0142', homes: ['Glasshouse Villa', 'Oceanline Retreat'], status: 'Working' },
  { name: 'David Mensah', email: 'david@yiminumhomes.com', phone: '+234 812 555 0176', homes: ['The Aria Residence'], status: 'Free' },
  { name: 'Zainab Bello', email: 'zainab@yiminumhomes.com', phone: '+234 907 555 0128', homes: ['Skyline Sky Suites', 'Meadow Family Home'], status: 'Working' },
  { name: 'Chidi Eze', email: 'chidi@yiminumhomes.com', phone: '+234 816 555 0193', homes: [], status: 'Free' },
  { name: 'Tomi Adeyemi', email: 'tomi@yiminumhomes.com', phone: '+234 909 555 0164', homes: ['The Brownstone'], status: 'Working' },
]

const inventoryStats = [
  { label: 'Total listings', value: '128', change: '+14 this quarter' },
  { label: 'Active', value: '94', change: '73.4% occupancy' },
  { label: 'Rented', value: '72', change: '18 renewed' },
  { label: 'Sold', value: '19', change: '3 pending close' },
]

const tenantRows = [
  { name: 'Maya Hill', unit: 'A-12', status: 'Lease active', contact: 'm.hill@email.com' },
  { name: 'Daniel Okafor', unit: 'B-04', status: 'Renewal due', contact: '+234 816 611 0012' },
  { name: 'Sarah John', unit: 'C-09', status: 'Lease active', contact: 'sarahj@outlook.com' },
  { name: 'Tunde Adebayo', unit: 'D-07', status: 'Overdue', contact: '+234 909 221 8441' },
]

const financialOverview = [
  { label: 'Rent collected', value: '₦8.4M', tone: 'text-emerald-600' },
  { label: 'Maintenance spend', value: '₦1.2M', tone: 'text-amber-600' },
  { label: 'Pending invoices', value: '₦640K', tone: 'text-rose-600' },
]

const maintenanceTickets = [
  { title: 'Water pump replacement', unit: 'B-04', priority: 'Urgent', count: '2 days' },
  { title: 'Gate sensor calibration', unit: 'A-12', priority: 'Normal', count: '4 days' },
  { title: 'HVAC servicing', unit: 'C-09', priority: 'Scheduled', count: '1 week' },
]

export function ManagementDashboard() {
  const [activeTab, setActiveTab] = useState<ManagementTab>('overview')

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
            <Building2 className="size-3.5" />
            Estate management
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Manage your portfolio with clarity.
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5"
          >
            Add new property
            <ArrowUpRight className="size-4" />
          </button>
          <Link
            href="/management/calculations"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5"
          >
            <Hammer className="size-4" />
            Calculations and Material Analysis
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mb-8 flex gap-6 border-b border-border" role="tablist" aria-label="Management sections">
        {(['overview', 'agents'] as const).map((tab) => (
          <button
            key={tab}
            id={`${tab}-tab`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-panel`}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'border-brand text-brand'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' ? (
        <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab">
      <div className="grid gap-6 lg:grid-cols-4">
        {inventoryStats.map((item) => (
          <div
            key={item.label}
            className="rounded-[1.6rem] border border-border bg-card p-5 shadow-sm shadow-black/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </span>
              <span className="rounded-full bg-brand/10 p-2 text-brand">
                <ClipboardList className="size-4" />
              </span>
            </div>
            <p className="mt-6 text-3xl font-semibold tracking-tight">{item.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[1.8rem] border border-border bg-card p-5 shadow-sm shadow-black/5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 p-2 text-primary">
                <Users className="size-4" />
              </span>
              <h2 className="text-xl font-semibold">Tenant directory</h2>
            </div>
            <span className="text-sm text-muted-foreground">87 active</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/80 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Tenant</th>
                  <th className="px-4 py-3 font-medium">Unit</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {tenantRows.map((tenant) => (
                  <tr key={tenant.name} className="border-t border-border bg-background/40">
                    <td className="px-4 py-3 font-medium">{tenant.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{tenant.unit}</td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                          tenant.status === 'Lease active'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : tenant.status === 'Renewal due'
                              ? 'bg-amber-500/10 text-amber-600'
                              : 'bg-rose-500/10 text-rose-600',
                        ].join(' ')}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{tenant.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-border bg-card p-5 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/10 p-2 text-emerald-600">
                <CircleDollarSign className="size-4" />
              </span>
              <h2 className="text-xl font-semibold">Financial overview</h2>
            </div>
            <BadgeCheck className="size-5 text-emerald-600" />
          </div>

          <div className="mt-6 space-y-4">
            {financialOverview.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-lg font-semibold ${item.tone}`}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.8rem] border border-border bg-card p-5 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-500/10 p-2 text-amber-600">
                <Wrench className="size-4" />
              </span>
              <h2 className="text-xl font-semibold">Maintenance requests</h2>
            </div>
            <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600">
              6 open
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {maintenanceTickets.map((ticket) => (
              <div key={ticket.title} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{ticket.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Unit {ticket.unit}</p>
                  </div>
                  <span
                    className={[
                      'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]',
                      ticket.priority === 'Urgent'
                        ? 'bg-rose-500/10 text-rose-600'
                        : ticket.priority === 'Normal'
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-emerald-500/10 text-emerald-600',
                    ].join(' ')}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">ETA: {ticket.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-border bg-card p-5 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand/10 p-2 text-brand">
                <Hammer className="size-4" />
              </span>
              <h2 className="text-xl font-semibold">Operational snapshot</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Vacant units</p>
              <p className="mt-2 text-3xl font-semibold">16</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Expiring leases</p>
              <p className="mt-2 text-3xl font-semibold">09</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Inspection score</p>
              <p className="mt-2 text-3xl font-semibold">96%</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Turnover rate</p>
              <p className="mt-2 text-3xl font-semibold">4.3%</p>
            </div>
          </div>
        </div>
      </div>
        </div>
      ) : (
        <div id="agents-panel" role="tabpanel" aria-labelledby="agents-tab">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Home agents</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {homeAgents.length} agents · {homeAgents.filter((agent) => agent.status === 'Free').length} available
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/80 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Agent</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Assigned homes</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {homeAgents.map((agent) => (
                    <tr key={agent.email} className="border-t border-border bg-background/40">
                      <td className="whitespace-nowrap px-4 py-4 font-medium">{agent.name}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1.5">
                          <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground" href={`mailto:${agent.email}`}>
                            <Mail className="size-3.5 shrink-0" />
                            {agent.email}
                          </a>
                          <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground" href={`tel:${agent.phone.replaceAll(' ', '')}`}>
                            <Phone className="size-3.5 shrink-0" />
                            {agent.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {agent.homes.length > 0 ? (
                          <span className="inline-flex items-center gap-2">
                            <Home className="size-3.5 shrink-0" />
                            {agent.homes.join(', ')}
                          </span>
                        ) : 'No homes assigned'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${
                          agent.status === 'Free'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          <span className="size-1.5 rounded-full bg-current" />
                          {agent.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
