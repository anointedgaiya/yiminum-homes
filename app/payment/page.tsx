'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  Copy,
  Landmark,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

const TABS = [
  { id: 'bank', label: 'Banks', icon: Landmark },
  { id: 'wallet', label: 'Opay', icon: Wallet },
  { id: 'advance', label: 'Payment in advance', icon: Banknote },
] as const

type TabId = (typeof TABS)[number]['id']

const METHOD_DATA = {
  bank: [
    {
      name: 'Access Bank',
      accountName: 'Yiminum Homes Ltd.',
      accountNumber: '0012345678',
      swift: 'ABNGNGLA',
    },
    {
      name: 'Zenith Bank',
      accountName: 'Yiminum Homes Ltd.',
      accountNumber: '1012345679',
      swift: 'ZEIBNGLA',
    },
    {
      name: 'GTBank',
      accountName: 'Yiminum Homes Ltd.',
      accountNumber: '0123456781',
      swift: 'GTBINGLA',
    },
  ],
  wallet: [
    {
      name: 'Opay',
      accountName: 'Yiminum Homes',
      accountNumber: '0904 123 4567',
      note: 'Monetize your payment instantly with your preferred wallet account.',
    },
    {
      name: 'PalmPay',
      accountName: 'Yiminum Homes',
      accountNumber: '0903 765 4321',
      note: 'Fast wallet transfer for local property deposits.',
    },
  ],
  advance: [
    {
      title: 'Payment in advance',
      value: '10% deposit',
      description: 'Secure your home with a non-refundable deposit to reserve your preferred property.',
    },
    {
      title: 'Balance on completion',
      value: '90% due',
      description: 'The remaining balance is cleared on final documentation and handover.',
    },
  ],
} as const

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('bank')
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const handleCopy = async (value: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(value)
        setCopiedValue(value)
        setTimeout(() => setCopiedValue(null), 1600)
      }
    } catch {
      setCopiedValue(null)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
        <header className="flex items-center justify-between rounded-full border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Secure payment
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">
                Payment options
              </div>

              <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Pay securely for your next home.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Choose the method that works best for you. We have streamlined every option for fast,
                secure confirmation and easy documentation.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={[
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all',
                      activeTab === id
                        ? 'border-brand bg-brand text-brand-foreground shadow-lg shadow-brand/20'
                        : 'border-border bg-background text-muted-foreground hover:border-brand/50 hover:text-foreground',
                    ].join(' ')}
                  >
                    <Icon className="size-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                {activeTab === 'bank' &&
                  METHOD_DATA.bank.map((bank) => (
                    <div
                      key={bank.accountNumber}
                      className="rounded-2xl border border-border bg-background/80 p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {bank.name}
                          </p>
                          <h2 className="mt-2 text-xl font-semibold">{bank.accountName}</h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bank.accountNumber)}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand hover:text-brand"
                        >
                          <Copy className="size-3.5" />
                          {copiedValue === bank.accountNumber ? 'Copied' : 'Copy account'}
                        </button>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-dashed border-border bg-card px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Account number
                          </p>
                          <p className="mt-2 text-lg font-semibold">{bank.accountNumber}</p>
                        </div>
                        <div className="rounded-xl border border-dashed border-border bg-card px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            SWIFT / code
                          </p>
                          <p className="mt-2 text-lg font-semibold">{bank.swift}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                {activeTab === 'wallet' &&
                  METHOD_DATA.wallet.map((wallet) => (
                    <div
                      key={wallet.accountNumber}
                      className="rounded-2xl border border-border bg-background/80 p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {wallet.name}
                          </p>
                          <h2 className="mt-2 text-xl font-semibold">{wallet.accountName}</h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(wallet.accountNumber)}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand hover:text-brand"
                        >
                          <Copy className="size-3.5" />
                          {copiedValue === wallet.accountNumber ? 'Copied' : 'Copy number'}
                        </button>
                      </div>

                      <div className="mt-4 rounded-xl border border-dashed border-border bg-card px-4 py-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Wallet number
                        </p>
                        <p className="mt-2 text-lg font-semibold">{wallet.accountNumber}</p>
                        <p className="mt-3 text-sm text-muted-foreground">{wallet.note}</p>
                      </div>
                    </div>
                  ))}

                {activeTab === 'advance' &&
                  METHOD_DATA.advance.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-background/80 p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {item.title}
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold">{item.value}</h2>
                        </div>
                        <div className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <CheckCircle2 className="size-5" />
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            <aside className="border-t border-border bg-gradient-to-br from-brand/10 via-background to-background p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
              <div className="rounded-[1.75rem] border border-brand/15 bg-card p-5 shadow-xl shadow-brand/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Payment summary
                  </p>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    Verified
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Property</p>
                  <h3 className="mt-2 text-2xl font-semibold">Oceanview Residence</h3>
                  <p className="mt-2 text-sm text-muted-foreground">2 Bedroom • Lagos, Nigeria</p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Property price</span>
                    <span className="font-semibold text-foreground">₦24,500,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Initial deposit</span>
                    <span className="font-semibold text-foreground">₦2,450,000</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
                    <span>Total due now</span>
                    <span className="text-brand">₦2,450,000</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <ShieldCheck className="size-5" />
                    <p className="text-sm font-semibold">Safe, traceable and secure</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Every payment is tracked for confirmation and documented for your property purchase.
                  </p>
                </div>

                <Link
                  href="/"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5"
                >
                  Continue property search
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
