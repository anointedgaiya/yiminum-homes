'use client'

import { useState } from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FIELD =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20'

const CONTACT_DETAILS = [
  { icon: Phone, label: 'Call us', value: '07039014229' },
  { icon: Mail, label: 'Email', value: 'anointedgaiya@gmail.com' },
  { icon: MapPin, label: 'Visit', value: 'Chris Uche street, Jos Nigeria' },
]

export function ContactCta() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl shadow-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex flex-col justify-between gap-10 bg-brand p-10 text-brand-foreground sm:p-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.28em] uppercase opacity-80">
                Contact Yiminum Homes
              </span>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Let&apos;s find your next home
              </h2>
              <p className="mt-4 max-w-md text-lg opacity-90">
                Tell us what you are looking for and a dedicated advisor will be in touch within 24
                hours.
              </p>
            </div>
            <ul className="space-y-5">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail.label} className="flex items-center gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/15">
                    <detail.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs tracking-wide uppercase opacity-75">
                      {detail.label}
                    </span>
                    <span className="block font-medium">{detail.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 sm:p-12">
            {sent ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                <div className="inline-flex size-16 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Mail className="size-7" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold">Thank you</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Your enquiry has been received. A Yiminum Homes advisor will reach out shortly.
                </p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      First name
                    </span>
                    <input className={FIELD} required placeholder="Jane" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Last name
                    </span>
                    <input className={FIELD} required placeholder="Doe" />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Email
                  </span>
                  <input type="email" className={FIELD} required placeholder="jane@email.com" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    I&apos;m interested in
                  </span>
                  <select className={FIELD} defaultValue="Buying">
                    <option>Buying a home</option>
                    <option>Renting a home</option>
                    <option>Selling my property</option>
                    <option>Property management</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Message
                  </span>
                  <textarea
                    className={FIELD + ' min-h-28 resize-none'}
                    placeholder="Tell us about your ideal home..."
                  />
                </label>
                <button
                  type="submit"
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Send enquiry
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
