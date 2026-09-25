import { Logo } from '@/components/logo'

const COLUMNS = [
  {
    title: 'Company',
    links: ['About us', 'Our team', 'Careers', 'Press'],
  },
  {
    title: 'Properties',
    links: ['For sale', 'For rent', 'New developments', 'Luxury homes'],
  },
  {
    title: 'Resources',
    links: ['Buying guide', 'Selling guide', 'Mortgage calculator', 'Blog'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo className="text-foreground" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Exceptional homes, apartments and properties designed around the way you want to
              live. Premium real estate, reimagined.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-brand/20 bg-brand/5 px-4 py-3 sm:px-5">
          <p className="text-sm font-medium text-foreground">
            Support: Opay - <a href="tel:7039014229" className="text-brand hover:underline">7039014229</a>
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yiminum Homes. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-brand">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
