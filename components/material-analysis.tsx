'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  Eraser,
  HardHat,
  Layers3,
  Plus,
  Printer,
  Ruler,
  Search,
  Settings2,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'

type Unit = 'Pieces' | 'Bags' | 'Tonnes' | 'kg' | 'Metres' | 'Square metres' | 'Cubic metres' | 'Litres' | 'Loads' | 'Cartons'
type Material = { id: string; name: string; category: string; unit: Unit; price: number }
type ProjectLine = { id: string; materialId: string; name: string; category: string; quantity: number; unit: Unit; price: number }
type Project = {
  name: string
  projectType: string
  size: number
  floors: number
  rooms: number
  finish: string
  waste: number
  labour: number
  transport: number
  other: number
  tax: number
  currency: string
  lines: ProjectLine[]
}
type SavedProject = { id: string; savedAt: string; project: Project; total: number }

const STORAGE_KEY = 'yiminum-material-analysis-v1'
const UNITS: Unit[] = ['Pieces', 'Bags', 'Tonnes', 'kg', 'Metres', 'Square metres', 'Cubic metres', 'Litres', 'Loads', 'Cartons']
const DEFAULT_CATEGORIES = [
  'Foundation', 'Structural', 'Blockwork', 'Roofing', 'Flooring', 'Ceiling', 'Doors & Windows',
  'Electrical', 'Plumbing', 'Painting', 'Interior Finishing', 'Exterior Finishing', 'Miscellaneous',
]

const MATERIAL_SEED: Omit<Material, 'id'>[] = [
  { name: 'Cement (50 kg)', category: 'Foundation', unit: 'Bags', price: 10500 },
  { name: 'Sharp sand', category: 'Foundation', unit: 'Loads', price: 78000 },
  { name: 'Granite aggregate', category: 'Foundation', unit: 'Loads', price: 165000 },
  { name: 'Reinforcement bar (12 mm)', category: 'Structural', unit: 'Pieces', price: 12500 },
  { name: 'Reinforcement bar (16 mm)', category: 'Structural', unit: 'Pieces', price: 22000 },
  { name: 'Binding wire', category: 'Structural', unit: 'kg', price: 2100 },
  { name: 'Ready-mix concrete', category: 'Structural', unit: 'Cubic metres', price: 135000 },
  { name: 'Structural steel', category: 'Structural', unit: 'Tonnes', price: 1250000 },
  { name: '9-inch concrete block', category: 'Blockwork', unit: 'Pieces', price: 950 },
  { name: '6-inch concrete block', category: 'Blockwork', unit: 'Pieces', price: 750 },
  { name: 'Clay brick', category: 'Blockwork', unit: 'Pieces', price: 550 },
  { name: 'Building sand', category: 'Blockwork', unit: 'Loads', price: 72000 },
  { name: 'Roofing sheet (long span)', category: 'Roofing', unit: 'Square metres', price: 14500 },
  { name: 'Roofing timber', category: 'Roofing', unit: 'Pieces', price: 8500 },
  { name: 'Roofing nails', category: 'Roofing', unit: 'kg', price: 2800 },
  { name: 'Waterproofing membrane', category: 'Roofing', unit: 'Square metres', price: 4200 },
  { name: 'Porcelain floor tile', category: 'Flooring', unit: 'Square metres', price: 18500 },
  { name: 'Ceramic wall tile', category: 'Flooring', unit: 'Square metres', price: 12500 },
  { name: 'Tile adhesive', category: 'Flooring', unit: 'Bags', price: 11500 },
  { name: 'Tile grout', category: 'Flooring', unit: 'Bags', price: 6500 },
  { name: 'POP ceiling plaster', category: 'Ceiling', unit: 'Bags', price: 14500 },
  { name: 'Gypsum ceiling board', category: 'Ceiling', unit: 'Pieces', price: 11500 },
  { name: 'Plywood (18 mm)', category: 'Ceiling', unit: 'Pieces', price: 32000 },
  { name: 'Flush door', category: 'Doors & Windows', unit: 'Pieces', price: 95000 },
  { name: 'Security entrance door', category: 'Doors & Windows', unit: 'Pieces', price: 385000 },
  { name: 'Aluminium window', category: 'Doors & Windows', unit: 'Square metres', price: 95000 },
  { name: 'Clear glass (6 mm)', category: 'Doors & Windows', unit: 'Square metres', price: 28000 },
  { name: 'Electrical cable (2.5 mm)', category: 'Electrical', unit: 'Metres', price: 950 },
  { name: 'Electrical cable (4 mm)', category: 'Electrical', unit: 'Metres', price: 1450 },
  { name: 'Double electrical socket', category: 'Electrical', unit: 'Pieces', price: 6800 },
  { name: 'Light switch', category: 'Electrical', unit: 'Pieces', price: 4200 },
  { name: 'LED ceiling light', category: 'Electrical', unit: 'Pieces', price: 18500 },
  { name: 'PVC conduit pipe', category: 'Electrical', unit: 'Pieces', price: 1800 },
  { name: 'PPR water pipe (25 mm)', category: 'Plumbing', unit: 'Metres', price: 2400 },
  { name: 'uPVC waste pipe (110 mm)', category: 'Plumbing', unit: 'Pieces', price: 12500 },
  { name: 'Plumbing fittings set', category: 'Plumbing', unit: 'Cartons', price: 58000 },
  { name: 'Water storage tank (1000 L)', category: 'Plumbing', unit: 'Pieces', price: 245000 },
  { name: 'Interior emulsion paint (20 L)', category: 'Painting', unit: 'Litres', price: 3400 },
  { name: 'Exterior weatherproof paint (20 L)', category: 'Painting', unit: 'Litres', price: 4900 },
  { name: 'Primer and sealer', category: 'Painting', unit: 'Litres', price: 2800 },
  { name: 'Timber (2 × 4)', category: 'Structural', unit: 'Pieces', price: 7200 },
  { name: 'Common nails', category: 'Miscellaneous', unit: 'kg', price: 2500 },
  { name: 'General-purpose screws', category: 'Miscellaneous', unit: 'Cartons', price: 9500 },
  { name: 'Exterior stone cladding', category: 'Exterior Finishing', unit: 'Square metres', price: 27500 },
  { name: 'Thermal insulation board', category: 'Interior Finishing', unit: 'Square metres', price: 9800 },
  { name: 'Bathroom fittings set', category: 'Interior Finishing', unit: 'Pieces', price: 185000 },
  { name: 'Kitchen cabinet (base unit)', category: 'Interior Finishing', unit: 'Metres', price: 185000 },
  { name: 'Waterproofing compound', category: 'Foundation', unit: 'Bags', price: 18500 },
  { name: 'Laterite fill', category: 'Foundation', unit: 'Loads', price: 58000 },
  { name: 'Crushed stone', category: 'Foundation', unit: 'Tonnes', price: 42000 },
  { name: 'Exterior paving stone', category: 'Exterior Finishing', unit: 'Square metres', price: 16500 },
]

const INITIAL_PROJECT: Project = {
  name: 'Ikoyi 4-Bed Residence', projectType: 'Residential', size: 280, floors: 2, rooms: 4,
  finish: 'Standard', waste: 5, labour: 800000, transport: 150000, other: 0, tax: 0, currency: 'NGN',
  lines: [
    { id: 'line-cement', materialId: 'cement-50kg', name: 'Cement (50 kg)', category: 'Foundation', quantity: 120, unit: 'Bags', price: 10500 },
    { id: 'line-block', materialId: 'block-9in', name: '9-inch concrete block', category: 'Blockwork', quantity: 700, unit: 'Pieces', price: 950 },
    { id: 'line-sand', materialId: 'sharp-sand', name: 'Sharp sand', category: 'Foundation', quantity: 8, unit: 'Loads', price: 78000 },
  ],
}

const INITIAL_MATERIALS = MATERIAL_SEED.map((item, index) => ({
  ...item,
  id: ['cement-50kg', 'sharp-sand', 'granite', 'rebar-12', 'rebar-16', 'binding-wire', 'concrete', 'steel', 'block-9in', 'block-6in'][index] ?? `material-${index}`,
}))

const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-semibold text-[#dce4dc] transition hover:border-[#91c886]/40 hover:bg-[#91c886]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'
const inputClass = 'h-10 w-full rounded-lg border border-white/10 bg-[#101816] px-3 text-sm text-[#eff3ed] outline-none placeholder:text-[#738078] focus:border-[#9bd68d]/60 focus:ring-2 focus:ring-[#9bd68d]/10'
const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.13em] text-[#829087]'
const cardClass = 'rounded-xl border border-white/[0.085] bg-[#121a17]/90 shadow-[0_18px_50px_rgba(0,0,0,0.14)]'

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat(currency === 'NGN' ? 'en-NG' : 'en-US', {
    style: 'currency', currency, maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0)
}

function lineTotal(line: ProjectLine) {
  return Math.max(0, line.quantity) * Math.max(0, line.price)
}

function getCost(project: Project) {
  const subtotal = project.lines.reduce((sum, line) => sum + lineTotal(line), 0)
  const wasteCost = subtotal * Math.max(0, project.waste) / 100
  const preTax = subtotal + wasteCost + project.labour + project.transport + project.other
  const taxCost = preTax * Math.max(0, project.tax) / 100
  return { subtotal, wasteCost, taxCost, total: preTax + taxCost }
}

function evaluateExpression(expression: string): number | null {
  const source = expression.replaceAll('×', '*').replaceAll('÷', '/')
  const tokens = source.match(/(?:\d+\.?\d*|\.\d+|[+\-*/()%])/g)
  if (!tokens || tokens.join('') !== source.replaceAll(' ', '')) return null
  const values: number[] = []
  const operators: string[] = []
  const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, 'u-': 3, '%': 4 }
  let expectsValue = true

  for (const token of tokens) {
    if (/^(?:\d+\.?\d*|\.\d+)$/.test(token)) {
      values.push(Number(token))
      expectsValue = false
      continue
    }
    if (token === '(') {
      operators.push(token)
      expectsValue = true
      continue
    }
    if (token === ')') {
      while (operators.length && operators.at(-1) !== '(') if (!applyOperator(values, operators.pop()!)) return null
      if (operators.pop() !== '(') return null
      expectsValue = false
      continue
    }
    const operator = token === '%' ? '%' : token === '-' && expectsValue ? 'u-' : token
    if (operator === '%' || operator === 'u-') {
      if (operator === '%') {
        const value = values.pop()
        if (value === undefined) return null
        values.push(value / 100)
      } else operators.push(operator)
      expectsValue = false
      continue
    }
    while (operators.length && operators.at(-1) !== '(' && precedence[operators.at(-1)!] >= precedence[operator]) {
      if (!applyOperator(values, operators.pop()!)) return null
    }
    operators.push(operator)
    expectsValue = true
  }
  if (expectsValue) return null
  while (operators.length) if (!applyOperator(values, operators.pop()!)) return null
  return values.length === 1 && Number.isFinite(values[0]) ? values[0] : null
}

function applyOperator(values: number[], operator: string) {
  if (operator === 'u-') {
    const value = values.pop()
    if (value === undefined) return false
    values.push(-value)
    return true
  }
  const right = values.pop()
  const left = values.pop()
  if (left === undefined || right === undefined || (operator === '/' && right === 0)) return false
  values.push(operator === '+' ? left + right : operator === '-' ? left - right : operator === '*' ? left * right : left / right)
  return true
}

function SectionHeading({ icon: Icon, eyebrow, title, detail, action }: {
  icon: typeof Layers3; eyebrow: string; title: string; detail?: string; action?: ReactNode
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#94c886]">
          <Icon className="size-3.5" /> {eyebrow}
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-[#f0f2ec] sm:text-2xl">{title}</h2>
        {detail ? <p className="mt-1 max-w-2xl text-sm leading-6 text-[#849188]">{detail}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function MaterialAnalysis() {
  const [catalog, setCatalog] = useState<Material[]>(INITIAL_MATERIALS)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [project, setProject] = useState<Project>(INITIAL_PROJECT)
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All materials')
  const [search, setSearch] = useState('')
  const [manageCatalog, setManageCatalog] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [newMaterial, setNewMaterial] = useState({ name: '', category: 'Miscellaneous', unit: 'Pieces' as Unit, price: '' })
  const [calculatorInput, setCalculatorInput] = useState('')
  const [calculatorResult, setCalculatorResult] = useState<number | null>(null)
  const [calculatorHistory, setCalculatorHistory] = useState<string[]>([])
  const [calculatorError, setCalculatorError] = useState('')
  const [estimator, setEstimator] = useState({ materialId: '', length: '', width: '', height: '', basis: 'area' })
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored) as { catalog?: Material[]; categories?: string[]; project?: Project; savedProjects?: SavedProject[]; calculatorHistory?: string[] }
        if (Array.isArray(data.catalog)) setCatalog(data.catalog)
        if (Array.isArray(data.categories)) setCategories(data.categories)
        if (data.project?.lines) setProject(data.project)
        if (Array.isArray(data.savedProjects)) setSavedProjects(data.savedProjects)
        if (Array.isArray(data.calculatorHistory)) setCalculatorHistory(data.calculatorHistory)
      }
    } catch {
      setNotice('Saved workspace data could not be read. A fresh estimate is ready.')
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ catalog, categories, project, savedProjects, calculatorHistory }))
  }, [catalog, categories, project, savedProjects, calculatorHistory, hydrated])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const filteredMaterials = useMemo(() => catalog.filter((material) =>
    (activeCategory === 'All materials' || material.category === activeCategory) &&
    material.name.toLowerCase().includes(search.toLowerCase()),
  ), [catalog, activeCategory, search])
  const costs = useMemo(() => getCost(project), [project])
  const unitSummary = useMemo(() => {
    const totals = new Map<string, number>()
    for (const line of project.lines) totals.set(line.unit, (totals.get(line.unit) ?? 0) + line.quantity)
    return [...totals].map(([unit, quantity]) => `${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 2 }).format(quantity)} ${unit.toLowerCase()}`).join(' · ')
  }, [project.lines])

  function updateProject<K extends keyof Project>(key: K, value: Project[K]) {
    setProject((current) => ({ ...current, [key]: value }))
  }

  function addMaterial(material: Material) {
    setProject((current) => {
      const existing = current.lines.find((line) => line.materialId === material.id)
      if (existing) return { ...current, lines: current.lines.map((line) => line.id === existing.id ? { ...line, quantity: line.quantity + 1 } : line) }
      return { ...current, lines: [...current.lines, { id: newId(), materialId: material.id, name: material.name, category: material.category, quantity: 1, unit: material.unit, price: material.price }] }
    })
    setNotice(`${material.name} added to the estimate`)
  }

  function updateLine(id: string, changes: Partial<ProjectLine>) {
    setProject((current) => ({ ...current, lines: current.lines.map((line) => line.id === id ? { ...line, ...changes } : line) }))
  }

  function saveProject() {
    const saved: SavedProject = { id: newId(), savedAt: new Date().toISOString(), project: structuredClone(project), total: costs.total }
    setSavedProjects((current) => [saved, ...current].slice(0, 12))
    setNotice('Project estimate saved on this device')
  }

  function downloadEstimate() {
    const rows = [
      ['Project', project.name], ['Currency', project.currency], ['Material', 'Category', 'Quantity', 'Unit', 'Unit price', 'Total'],
      ...project.lines.map((line) => [line.name, line.category, String(line.quantity), line.unit, String(line.price), String(lineTotal(line))]),
      ['', '', '', '', 'Materials subtotal', String(costs.subtotal)], ['', '', '', '', 'Waste allowance', String(costs.wasteCost)],
      ['', '', '', '', 'Labour', String(project.labour)], ['', '', '', '', 'Transportation', String(project.transport)],
      ['', '', '', '', 'Other expenses', String(project.other)], ['', '', '', '', 'Tax / additional costs', String(costs.taxCost)],
      ['', '', '', '', 'Project estimate', String(costs.total)],
    ]
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${project.name.trim().replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'construction-estimate'}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
    setNotice('Estimate downloaded as a CSV file')
  }

  function addCatalogMaterial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const material: Material = { id: newId(), name: newMaterial.name.trim(), category: newMaterial.category, unit: newMaterial.unit, price: Math.max(0, Number(newMaterial.price) || 0) }
    if (!material.name) return
    setCatalog((current) => [...current, material])
    setNewMaterial((current) => ({ ...current, name: '', price: '' }))
    setNotice('Material added to the editable catalogue')
  }

  function updateCatalog(id: string, changes: Partial<Material>) {
    setCatalog((current) => current.map((material) => material.id === id ? { ...material, ...changes } : material))
    setProject((current) => ({ ...current, lines: current.lines.map((line) => line.materialId === id ? {
      ...line,
      ...(changes.name !== undefined ? { name: changes.name } : {}),
      ...(changes.category !== undefined ? { category: changes.category } : {}),
      ...(changes.unit !== undefined ? { unit: changes.unit } : {}),
      ...(changes.price !== undefined ? { price: changes.price } : {}),
    } : line) }))
  }

  function deleteCatalogMaterial(material: Material) {
    setCatalog((current) => current.filter((item) => item.id !== material.id))
    setProject((current) => ({ ...current, lines: current.lines.filter((line) => line.materialId !== material.id) }))
    setNotice(`${material.name} removed from catalogue and estimate`)
  }

  function addCalculatorCharacter(character: string) {
    setCalculatorError('')
    setCalculatorInput((current) => current + character)
  }

  function calculate() {
    const result = evaluateExpression(calculatorInput)
    if (result === null) {
      setCalculatorError('Check the expression and try again.')
      setCalculatorResult(null)
      return
    }
    setCalculatorResult(result)
    setCalculatorHistory((current) => [`${calculatorInput} = ${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 8 }).format(result)}`, ...current].slice(0, 5))
    setCalculatorInput(String(result))
    setCalculatorError('')
  }

  const selectedEstimatorMaterial = catalog.find((material) => material.id === estimator.materialId)
  const dimensions = [estimator.length, estimator.width, estimator.height].map((value) => Math.max(0, Number(value) || 0))
  const estimatedQuantity = estimator.basis === 'volume' ? dimensions[0] * dimensions[1] * dimensions[2]
    : estimator.basis === 'area' ? dimensions[0] * dimensions[1] : dimensions[0]

  function applyQuantityEstimate() {
    if (!selectedEstimatorMaterial || estimatedQuantity <= 0) return
    const material = selectedEstimatorMaterial
    setProject((current) => {
      const existing = current.lines.find((line) => line.materialId === material.id)
      if (existing) return { ...current, lines: current.lines.map((line) => line.id === existing.id ? { ...line, quantity: estimatedQuantity } : line) }
      return { ...current, lines: [...current.lines, { id: newId(), materialId: material.id, name: material.name, category: material.category, quantity: estimatedQuantity, unit: material.unit, price: material.price }] }
    })
    setNotice(`Estimated quantity applied to ${material.name}`)
  }

  const estimateFactors: Record<string, number> = { Residential: 1, Commercial: 1.2, Renovation: 0.72 }
  const finishFactors: Record<string, number> = { Economy: 0.75, Standard: 1, Premium: 1.32, Luxury: 1.68 }
  const estimatorTotalArea = Math.max(0, project.size) * Math.max(1, project.floors)
  const estimatedMaterialsCost = estimatorTotalArea * 180000 * (estimateFactors[project.projectType] ?? 1) * (finishFactors[project.finish] ?? 1)
  const estimatedLabourCost = estimatedMaterialsCost * 0.32

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b1110] text-[#e8eee8] selection:bg-[#93c986]/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_83%_0%,rgba(99,146,116,0.16),transparent_34%),radial-gradient(ellipse_at_0%_44%,rgba(87,127,145,0.09),transparent_38%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-16 sm:px-7 lg:px-10">
        <header className="flex min-h-[76px] items-center justify-between border-b border-white/[0.09]">
          <Link href="/management" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a9b6ac] transition hover:text-white">
            <ArrowLeft className="size-4" /> Management
          </Link>
          <div className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.19em] text-[#758279] sm:flex">
            <span className="grid size-7 place-items-center rounded-lg border border-[#9fca8b]/20 bg-[#9fca8b]/10 text-[#abd68f]"><HardHat className="size-4" /></span>
            Yiminum Build Intelligence
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a0cf8d]/20 bg-[#a0cf8d]/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a9d995]">
            <span className="size-1.5 rounded-full bg-[#a9d995] shadow-[0_0_10px_#a9d995]" /> Local workspace
          </div>
        </header>

        <section className="relative py-9 sm:py-12">
          <div className="absolute right-0 top-8 hidden h-36 w-36 rounded-full border border-[#a6cd91]/10 sm:block" />
          <div className="absolute right-8 top-16 hidden h-20 w-20 rounded-full border border-[#a6cd91]/10 sm:block" />
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9bc88a]">Yiminum Homes / Construction intelligence</p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#f3f3ed] sm:text-4xl lg:text-[46px]">Calculations &amp; Material Analysis</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#929f96] sm:text-base">Plan, calculate and manage your construction costs with precision.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={downloadEstimate} className={buttonClass}><Download className="size-4" /> Download estimate</button>
              <button type="button" onClick={() => window.print()} className={buttonClass}><Printer className="size-4" /> Print</button>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className={`${cardClass} p-4`}><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f8d84]">Project estimate</p><p className="mt-2 truncate text-xl font-semibold text-[#c1e8a0] sm:text-2xl">{formatMoney(costs.total, project.currency)}</p><div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#87958b]"><TrendingUp className="size-3.5 text-[#9bce89]" /> Live estimate</div></div>
            <div className={`${cardClass} p-4`}><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f8d84]">Material lines</p><p className="mt-2 text-2xl font-semibold text-[#eef2eb]">{project.lines.length.toString().padStart(2, '0')}</p><p className="mt-2 text-[11px] text-[#87958b]">{new Set(project.lines.map((line) => line.category)).size} categories represented</p></div>
            <div className={`${cardClass} p-4`}><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f8d84]">Materials subtotal</p><p className="mt-2 truncate text-xl font-semibold text-[#e9eee9] sm:text-2xl">{formatMoney(costs.subtotal, project.currency)}</p><p className="mt-2 text-[11px] text-[#87958b]">Before waste &amp; labour</p></div>
            <div className={`${cardClass} p-4`}><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7f8d84]">Estimate coverage</p><div className="mt-3 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-gradient-to-r from-[#78b989] to-[#c5dc8a]" style={{ width: `${Math.min(100, project.lines.length / 18 * 100)}%` }} /></div><span className="text-sm font-semibold text-[#d8e8d4]">{Math.min(100, Math.round(project.lines.length / 18 * 100))}%</span></div><p className="mt-2 text-[11px] text-[#87958b]">Of an 18-line planning baseline</p></div>
          </div>
        </section>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="min-w-0 space-y-6">
            <section className={`${cardClass} p-4 sm:p-6`}>
              <SectionHeading icon={Layers3} eyebrow="01 / Materials" title="Materials calculator" detail="Search the cost library, select materials and adjust quantities or current supplier pricing." action={<button type="button" onClick={() => setManageCatalog((open) => !open)} className={buttonClass}><Settings2 className="size-4" /> {manageCatalog ? 'Close library manager' : 'Manage library'}</button>} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex-1"><span className="sr-only">Search materials</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7e8a82]" /><input className={`${inputClass} pl-9`} placeholder="Search cement, cables, tiles…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
                <select aria-label="Filter material category" value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} className={`${inputClass} sm:w-56`}><option>All materials</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {['All materials', ...categories].map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${activeCategory === category ? 'border-[#98ca85]/35 bg-[#98ca85]/10 text-[#b8df9f]' : 'border-white/[0.08] text-[#859188] hover:border-white/20 hover:text-white'}`}>{category}</button>)}
              </div>
              <div className="mt-4 grid max-h-[280px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMaterials.map((material) => <button type="button" key={material.id} onClick={() => addMaterial(material)} className="group flex min-w-0 items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-[#0e1512]/75 px-3 py-3 text-left transition hover:border-[#9bc88a]/30 hover:bg-[#19241d]"><span className="min-w-0"><span className="block truncate text-sm font-semibold text-[#e4e9e2]">{material.name}</span><span className="mt-1 block truncate text-[11px] text-[#7e8a82]">{material.category} <span className="px-1 text-[#4e5d53]">/</span> {formatMoney(material.price, project.currency)} per {material.unit.toLowerCase()}</span></span><span className="grid size-8 shrink-0 place-items-center rounded-md border border-white/10 text-[#829087] transition group-hover:border-[#9bc88a]/30 group-hover:bg-[#9bc88a]/10 group-hover:text-[#b7e19e]"><Plus className="size-4" /></span></button>)}
                {filteredMaterials.length === 0 && <p className="col-span-full py-8 text-center text-sm text-[#829087]">No materials match that search. Add one in the library manager.</p>}
              </div>

              {manageCatalog && <div className="mt-6 rounded-xl border border-[#93c986]/20 bg-[#0c1310] p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-[#e7eee6]">Editable material library</h3><p className="mt-1 text-xs text-[#819087]">Changes are saved on this device and update matching estimate lines.</p></div><span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-[#9aa89e]">{catalog.length} materials</span></div>
                <form onSubmit={addCatalogMaterial} className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.75fr_0.8fr_auto]">
                  <label><span className={labelClass}>New material</span><input required className={inputClass} placeholder="Material name" value={newMaterial.name} onChange={(event) => setNewMaterial({ ...newMaterial, name: event.target.value })} /></label>
                  <label><span className={labelClass}>Category</span><select className={inputClass} value={newMaterial.category} onChange={(event) => setNewMaterial({ ...newMaterial, category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
                  <label><span className={labelClass}>Unit</span><select className={inputClass} value={newMaterial.unit} onChange={(event) => setNewMaterial({ ...newMaterial, unit: event.target.value as Unit })}>{UNITS.map((unit) => <option key={unit}>{unit}</option>)}</select></label>
                  <label><span className={labelClass}>Unit price</span><input type="number" min="0" step="any" className={inputClass} placeholder="0" value={newMaterial.price} onChange={(event) => setNewMaterial({ ...newMaterial, price: event.target.value })} /></label>
                  <button type="submit" className={`${buttonClass} self-end border-[#9bce89]/30 bg-[#9bce89]/10 text-[#c1e4ae]`}><Plus className="size-4" /> Add</button>
                </form>
                <form onSubmit={(event) => { event.preventDefault(); const name = newCategory.trim(); if (name && !categories.includes(name)) { setCategories((current) => [...current, name]); setNewCategory(''); setNotice('Material category added') } }} className="mt-3 flex gap-2">
                  <input className={inputClass} placeholder="Add a material category" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
                  <button type="submit" className={buttonClass}><Plus className="size-4" /><span className="hidden sm:inline">Category</span></button>
                </form>
                <div className="mt-4 max-h-64 overflow-auto rounded-lg border border-white/[0.08]">
                  <table className="w-full min-w-[720px] text-left text-xs"><thead className="sticky top-0 bg-[#1a241f] text-[#8d9a90]"><tr><th className="px-3 py-2">Material name</th><th className="px-3 py-2">Category</th><th className="px-3 py-2">Unit</th><th className="px-3 py-2">Unit price</th><th className="w-10 px-2 py-2" /></tr></thead><tbody>{catalog.map((material) => <tr key={material.id} className="border-t border-white/[0.06]"><td className="px-2 py-1.5"><input aria-label={`${material.name} name`} className="h-8 w-full min-w-40 rounded border border-transparent bg-transparent px-2 text-xs text-[#dce5dd] focus:border-white/10 focus:bg-[#101714]" value={material.name} onChange={(event) => updateCatalog(material.id, { name: event.target.value })} /></td><td className="px-2 py-1.5"><select aria-label={`${material.name} category`} className="h-8 w-full min-w-36 rounded border border-transparent bg-[#101714] px-2 text-xs text-[#c6d0c7]" value={material.category} onChange={(event) => updateCatalog(material.id, { category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></td><td className="px-2 py-1.5"><select aria-label={`${material.name} unit`} className="h-8 w-full min-w-28 rounded border border-transparent bg-[#101714] px-2 text-xs text-[#c6d0c7]" value={material.unit} onChange={(event) => updateCatalog(material.id, { unit: event.target.value as Unit })}>{UNITS.map((unit) => <option key={unit}>{unit}</option>)}</select></td><td className="px-2 py-1.5"><input aria-label={`${material.name} unit price`} type="number" min="0" step="any" className="h-8 w-28 rounded border border-transparent bg-transparent px-2 text-xs text-[#dce5dd] focus:border-white/10 focus:bg-[#101714]" value={material.price} onChange={(event) => updateCatalog(material.id, { price: Math.max(0, Number(event.target.value) || 0) })} /></td><td className="px-2 py-1.5"><button type="button" title={`Delete ${material.name}`} aria-label={`Delete ${material.name}`} onClick={() => deleteCatalogMaterial(material)} className="grid size-8 place-items-center rounded text-[#89958b] hover:bg-rose-400/10 hover:text-rose-300"><Trash2 className="size-3.5" /></button></td></tr>)}</tbody></table>
                </div>
              </div>}

              <div className="mt-7 flex flex-wrap items-end justify-between gap-3"><div><h3 className="text-base font-semibold text-[#e8ede7]">Project material takeoff</h3><p className="mt-1 text-xs text-[#849188]">Adjust the working quantity, unit and supplier price for every line.</p></div><label className="w-36"><span className={labelClass}>Currency</span><select className={inputClass} value={project.currency} onChange={(event) => updateProject('currency', event.target.value)}><option value="NGN">NGN · Naira</option><option value="USD">USD · US Dollar</option><option value="GBP">GBP · Pound Sterling</option></select></label></div>
              <div className="mt-3 overflow-x-auto rounded-lg border border-white/[0.08]"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-white/[0.035] text-[10px] font-bold uppercase tracking-[0.13em] text-[#849188]"><tr><th className="px-3 py-3">Material</th><th className="px-3 py-3">Category</th><th className="px-3 py-3">Quantity</th><th className="px-3 py-3">Unit</th><th className="px-3 py-3">Unit price</th><th className="px-3 py-3 text-right">Total</th><th className="w-10 px-2 py-3" /></tr></thead><tbody>{project.lines.map((line) => <tr key={line.id} className="border-t border-white/[0.07] transition hover:bg-white/[0.02]"><td className="px-3 py-3 font-medium text-[#e3e9e1]">{line.name}</td><td className="px-3 py-3 text-xs text-[#89968d]">{line.category}</td><td className="px-3 py-3"><div className="flex items-center gap-1"><button type="button" aria-label={`Decrease ${line.name} quantity`} onClick={() => updateLine(line.id, { quantity: Math.max(0, line.quantity - 1) })} className="grid size-7 place-items-center rounded border border-white/10 text-[#9aa79e] hover:bg-white/10">−</button><input aria-label={`${line.name} quantity`} type="number" min="0" step="any" className="h-8 w-20 rounded border border-white/[0.08] bg-[#0d1411] px-2 text-center text-xs text-white" value={line.quantity} onChange={(event) => updateLine(line.id, { quantity: Math.max(0, Number(event.target.value) || 0) })} /><button type="button" aria-label={`Increase ${line.name} quantity`} onClick={() => updateLine(line.id, { quantity: line.quantity + 1 })} className="grid size-7 place-items-center rounded border border-white/10 text-[#9aa79e] hover:bg-white/10">+</button></div></td><td className="px-3 py-3"><select aria-label={`${line.name} measurement unit`} className="h-8 rounded border border-white/[0.08] bg-[#0d1411] px-2 text-xs text-[#d7e0d7]" value={line.unit} onChange={(event) => updateLine(line.id, { unit: event.target.value as Unit })}>{UNITS.map((unit) => <option key={unit}>{unit}</option>)}</select></td><td className="px-3 py-3"><label className="flex h-8 w-32 items-center gap-1 rounded border border-white/[0.08] bg-[#0d1411] px-2"><span className="text-xs text-[#78867c]">{project.currency === 'NGN' ? '₦' : project.currency}</span><input aria-label={`${line.name} unit price`} type="number" min="0" step="any" className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none" value={line.price} onChange={(event) => updateLine(line.id, { price: Math.max(0, Number(event.target.value) || 0) })} /></label></td><td className="whitespace-nowrap px-3 py-3 text-right font-semibold tabular-nums text-[#d2e4cf]">{formatMoney(lineTotal(line), project.currency)}</td><td className="px-2 py-3"><button type="button" title={`Remove ${line.name}`} aria-label={`Remove ${line.name}`} onClick={() => setProject((current) => ({ ...current, lines: current.lines.filter((item) => item.id !== line.id) }))} className="grid size-8 place-items-center rounded text-[#809087] hover:bg-rose-400/10 hover:text-rose-300"><Trash2 className="size-4" /></button></td></tr>)}{project.lines.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-[#829087]">No materials in this estimate. Search the library above to add a line.</td></tr>}</tbody></table></div>
            </section>

            <section className={`${cardClass} p-4 sm:p-6`}>
              <SectionHeading icon={TrendingUp} eyebrow="02 / Cost planning" title="Project cost estimator" detail="A planning benchmark based on floor area, building type and finish level. Refine it with supplier quotes above." />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <label><span className={labelClass}>Project type</span><select className={inputClass} value={project.projectType} onChange={(event) => updateProject('projectType', event.target.value)}><option>Residential</option><option>Commercial</option><option>Renovation</option></select></label>
                <label><span className={labelClass}>Floor area (m²)</span><input type="number" min="0" className={inputClass} value={project.size} onChange={(event) => updateProject('size', Math.max(0, Number(event.target.value) || 0))} /></label>
                <label><span className={labelClass}>Number of floors</span><input type="number" min="1" className={inputClass} value={project.floors} onChange={(event) => updateProject('floors', Math.max(1, Number(event.target.value) || 1))} /></label>
                <label><span className={labelClass}>Number of rooms</span><input type="number" min="0" className={inputClass} value={project.rooms} onChange={(event) => updateProject('rooms', Math.max(0, Number(event.target.value) || 0))} /></label>
                <label className="sm:col-span-2"><span className={labelClass}>Finishing level</span><select className={inputClass} value={project.finish} onChange={(event) => updateProject('finish', event.target.value)}><option>Economy</option><option>Standard</option><option>Premium</option><option>Luxury</option></select></label>
                <div className="rounded-lg border border-white/[0.07] bg-[#0e1512] p-3"><span className={labelClass}>Estimated materials</span><p className="mt-1 font-semibold text-[#d6e9c4]">{formatMoney(estimatedMaterialsCost, project.currency)}</p></div>
                <div className="rounded-lg border border-white/[0.07] bg-[#0e1512] p-3"><span className={labelClass}>Estimated labour</span><p className="mt-1 font-semibold text-[#c1dce6]">{formatMoney(estimatedLabourCost, project.currency)}</p></div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#9bc88a]/15 bg-gradient-to-r from-[#91c986]/[0.07] to-[#8abbd1]/[0.05] px-4 py-3"><span className="text-sm text-[#a8b5aa]">Indicative estimate · {estimatorTotalArea.toLocaleString()} m² total floor area</span><span className="text-lg font-semibold text-[#d9edc8]">{formatMoney(estimatedMaterialsCost + estimatedLabourCost, project.currency)}</span></div>
            </section>

            <section className={`${cardClass} p-4 sm:p-6`}>
              <SectionHeading icon={Ruler} eyebrow="03 / Measurement" title="Quantity estimator" detail="Calculate a geometric area, volume or linear measurement, then apply it to a material line." />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <label className="sm:col-span-2"><span className={labelClass}>Material to update</span><select className={inputClass} value={estimator.materialId} onChange={(event) => setEstimator({ ...estimator, materialId: event.target.value })}><option value="">Select a material</option>{catalog.map((material) => <option key={material.id} value={material.id}>{material.name} · {material.unit}</option>)}</select></label>
                <label><span className={labelClass}>Measurement</span><select className={inputClass} value={estimator.basis} onChange={(event) => setEstimator({ ...estimator, basis: event.target.value })}><option value="area">Area (m²)</option><option value="volume">Volume (m³)</option><option value="length">Length (m)</option></select></label>
                <label><span className={labelClass}>Length (m)</span><input type="number" min="0" step="any" className={inputClass} value={estimator.length} onChange={(event) => setEstimator({ ...estimator, length: event.target.value })} placeholder="0" /></label>
                <label><span className={labelClass}>{estimator.basis === 'length' ? 'Width (optional)' : 'Width (m)'}</span><input type="number" min="0" step="any" className={inputClass} value={estimator.width} onChange={(event) => setEstimator({ ...estimator, width: event.target.value })} placeholder="0" /></label>
                {estimator.basis === 'volume' && <label><span className={labelClass}>Height (m)</span><input type="number" min="0" step="any" className={inputClass} value={estimator.height} onChange={(event) => setEstimator({ ...estimator, height: event.target.value })} placeholder="0" /></label>}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4"><p className="text-sm text-[#9ba89e]">Calculated {estimator.basis}: <strong className="text-[#dcebd0]">{estimatedQuantity.toLocaleString(undefined, { maximumFractionDigits: 2 })} {estimator.basis === 'area' ? 'm²' : estimator.basis === 'volume' ? 'm³' : 'm'}</strong>{selectedEstimatorMaterial ? <span> · {selectedEstimatorMaterial.name} is priced by {selectedEstimatorMaterial.unit.toLowerCase()}</span> : null}</p><button type="button" disabled={!selectedEstimatorMaterial || estimatedQuantity <= 0} onClick={applyQuantityEstimate} className={`${buttonClass} border-[#9bce89]/25 bg-[#9bce89]/10 text-[#c1e4ae]`}><Check className="size-4" /> Apply quantity</button></div>
              <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-[#77847b]"><CircleHelp className="mt-0.5 size-3.5 shrink-0" />This tool computes dimensions only. Material yield, pack sizes and cutting allowances vary by specification; use the waste allowance in the estimate for planning.</p>
            </section>

            <section className={`${cardClass} p-4 sm:p-6`}>
              <SectionHeading icon={Calculator} eyebrow="04 / Utility" title="Inbuilt calculator" detail="Four-function arithmetic, percentages, decimals and calculation history." />
              <div className="grid gap-5 md:grid-cols-[1fr_230px]">
                <div className="rounded-xl border border-white/[0.08] bg-[#0c1310] p-4">
                  <div className="mb-3 min-h-[74px] rounded-lg border border-white/[0.06] bg-[#080d0b] px-4 py-3 text-right"><div className="min-h-5 break-all text-sm text-[#849188]">{calculatorInput || '0'}</div><div className="mt-1 min-h-7 text-2xl font-semibold tabular-nums text-[#c6e7b3]">{calculatorResult !== null && calculatorInput === String(calculatorResult) ? calculatorResult.toLocaleString(undefined, { maximumFractionDigits: 8 }) : ''}</div></div>
                  {calculatorError && <p role="alert" className="mb-2 text-xs text-rose-300">{calculatorError}</p>}
                  <div className="grid grid-cols-4 gap-2">{['C', 'DEL', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '±', '0', '.', '='].map((key) => <button type="button" key={key} onClick={() => key === 'C' ? (setCalculatorInput(''), setCalculatorResult(null), setCalculatorError('')) : key === 'DEL' ? setCalculatorInput((value) => value.slice(0, -1)) : key === '=' ? calculate() : key === '±' ? setCalculatorInput((value) => value.startsWith('-') ? value.slice(1) : `-${value}`) : addCalculatorCharacter(key === '−' ? '-' : key)} className={`h-10 rounded-lg border text-sm font-semibold transition hover:-translate-y-0.5 ${key === '=' ? 'border-[#9bce89]/30 bg-[#9bce89] text-[#0d160e] hover:bg-[#b2dfa0]' : ['÷', '×', '−', '+', '%'].includes(key) ? 'border-[#8bb6c9]/15 bg-[#8bb6c9]/[0.08] text-[#a7ccda] hover:bg-[#8bb6c9]/15' : 'border-white/[0.07] bg-white/[0.035] text-[#dce4dc] hover:bg-white/[0.09]'}`}>{key === 'DEL' ? <Eraser className="mx-auto size-4" /> : key}</button>)}</div>
                </div>
                <div><h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#8c998f]">Recent calculations</h3><div className="mt-3 space-y-2">{calculatorHistory.length ? calculatorHistory.map((entry, index) => <div key={`${entry}-${index}`} className="rounded-lg border border-white/[0.07] bg-[#0e1512] px-3 py-2.5 text-xs text-[#b6c2b8]">{entry}</div>) : <p className="rounded-lg border border-dashed border-white/10 px-3 py-5 text-center text-xs leading-5 text-[#748078]">Your completed calculations will appear here.</p>}</div></div>
              </div>
            </section>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-5">
            <section className="overflow-hidden rounded-xl border border-[#a3d28f]/20 bg-[#131b17] shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
              <div className="border-b border-white/[0.08] bg-gradient-to-br from-[#a1d38b]/[0.12] via-transparent to-[#84b6c6]/[0.06] p-5">
                <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9acb87]">Live project summary</p><h2 className="mt-2 text-lg font-semibold text-white">{project.name || 'Untitled project'}</h2><p className="mt-1 text-xs text-[#89968d]">{project.projectType} · {project.size} m² · {project.floors} {project.floors === 1 ? 'floor' : 'floors'}</p></div><span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-[#b3dba0]"><Layers3 className="size-4" /></span></div>
                <label className="mt-4 block"><span className={labelClass}>Project name</span><input className={inputClass} value={project.name} onChange={(event) => updateProject('name', event.target.value)} placeholder="Name this estimate" /></label>
                <label className="mt-3 block"><span className={labelClass}>Currency</span><select className={inputClass} value={project.currency} onChange={(event) => updateProject('currency', event.target.value)}><option value="NGN">NGN · Nigerian Naira</option><option value="USD">USD · US Dollar</option><option value="GBP">GBP · Pound Sterling</option></select></label>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between text-sm"><span className="text-[#9aa79e]">Materials subtotal</span><span className="font-semibold tabular-nums text-[#e7ece5]">{formatMoney(costs.subtotal, project.currency)}</span></div>
                <label className="flex items-center justify-between gap-3 text-sm"><span className="text-[#9aa79e]">Waste allowance (%)</span><input aria-label="Waste allowance percentage" type="number" min="0" max="100" step="any" value={project.waste} onChange={(event) => updateProject('waste', Math.max(0, Number(event.target.value) || 0))} className="h-8 w-20 rounded-md border border-white/10 bg-[#0d1411] px-2 text-right text-xs text-white" /></label>
                <div className="flex items-center justify-between text-sm"><span className="text-[#9aa79e]">Waste allowance</span><span className="tabular-nums text-[#b6c8b4]">{formatMoney(costs.wasteCost, project.currency)}</span></div>
                <label className="flex items-center justify-between gap-3 text-sm"><span className="text-[#9aa79e]">Labour cost</span><input aria-label="Labour cost" type="number" min="0" step="any" value={project.labour} onChange={(event) => updateProject('labour', Math.max(0, Number(event.target.value) || 0))} className="h-8 w-32 rounded-md border border-white/10 bg-[#0d1411] px-2 text-right text-xs text-white" /></label>
                <label className="flex items-center justify-between gap-3 text-sm"><span className="text-[#9aa79e]">Transportation</span><input aria-label="Transportation cost" type="number" min="0" step="any" value={project.transport} onChange={(event) => updateProject('transport', Math.max(0, Number(event.target.value) || 0))} className="h-8 w-32 rounded-md border border-white/10 bg-[#0d1411] px-2 text-right text-xs text-white" /></label>
                <label className="flex items-center justify-between gap-3 text-sm"><span className="text-[#9aa79e]">Other expenses</span><input aria-label="Other expenses" type="number" min="0" step="any" value={project.other} onChange={(event) => updateProject('other', Math.max(0, Number(event.target.value) || 0))} className="h-8 w-32 rounded-md border border-white/10 bg-[#0d1411] px-2 text-right text-xs text-white" /></label>
                <label className="flex items-center justify-between gap-3 text-sm"><span className="text-[#9aa79e]">Tax / additional (%)</span><input aria-label="Tax percentage" type="number" min="0" max="100" step="any" value={project.tax} onChange={(event) => updateProject('tax', Math.max(0, Number(event.target.value) || 0))} className="h-8 w-20 rounded-md border border-white/10 bg-[#0d1411] px-2 text-right text-xs text-white" /></label>
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-sm"><span className="text-[#9aa79e]">Tax / additional costs</span><span className="tabular-nums text-[#b6c8b4]">{formatMoney(costs.taxCost, project.currency)}</span></div>
                <div className="rounded-lg border border-[#a3d28f]/15 bg-gradient-to-r from-[#93c986]/[0.1] to-[#86bac9]/[0.06] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#96b68e]">Overall project estimate</p><p className="mt-2 break-words text-[26px] font-semibold tabular-nums tracking-tight text-[#daf0c6]">{formatMoney(costs.total, project.currency)}</p></div>
                <div className="flex flex-wrap gap-2 pt-1"><button type="button" onClick={saveProject} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#a7d68f] px-3 py-2.5 text-sm font-bold text-[#132015] transition hover:bg-[#c3e6ac]"><Check className="size-4" /> Save project</button><button type="button" title="Print estimate" aria-label="Print estimate" onClick={() => window.print()} className={buttonClass}><Printer className="size-4" /></button></div>
                <div className="grid grid-cols-2 gap-2"><button type="button" onClick={downloadEstimate} className={`${buttonClass} w-full`}><Download className="size-4" /> Download</button><button type="button" onClick={() => { if (window.confirm('Clear the full estimate and all project cost inputs?')) { setProject((current) => ({ ...current, name: '', size: 0, floors: 1, rooms: 0, waste: 0, labour: 0, transport: 0, other: 0, tax: 0, lines: [] })); setNotice('Project estimate cleared') } }} className={`${buttonClass} w-full text-[#c19e9e] hover:border-rose-300/30 hover:bg-rose-300/10 hover:text-rose-200`}><Trash2 className="size-4" /> Clear project</button></div>
              </div>
            </section>

            <section className={`${cardClass} p-4`}><div className="flex items-center justify-between gap-2"><div><h3 className="text-sm font-semibold text-[#e4eae3]">Estimate breakdown</h3><p className="mt-1 text-[11px] text-[#829087]">Material cost distribution</p></div><ChevronDown className="size-4 text-[#7d8a80]" /></div><div className="mt-4 space-y-3">{[
              { label: 'Materials', value: costs.subtotal, color: 'bg-[#a6d58e]' },
              { label: 'Labour', value: project.labour, color: 'bg-[#83b9ca]' },
              { label: 'Transport & other', value: project.transport + project.other, color: 'bg-[#d5bd83]' },
              { label: 'Waste & tax', value: costs.wasteCost + costs.taxCost, color: 'bg-[#b5a2d0]' },
            ].map((item) => <div key={item.label}><div className="mb-1.5 flex justify-between gap-2 text-xs"><span className="text-[#a1ada3]">{item.label}</span><span className="text-[#d4ddd4]">{costs.total ? Math.round(item.value / costs.total * 100) : 0}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><div className={`h-full rounded-full ${item.color} transition-all duration-500`} style={{ width: `${costs.total ? Math.min(100, item.value / costs.total * 100) : 0}%` }} /></div></div>)}</div></section>

            <section className={`${cardClass} p-4`}><div className="flex items-center justify-between gap-3"><div><h3 className="text-sm font-semibold text-[#e4eae3]">Project summary</h3><p className="mt-1 text-[11px] text-[#829087]">{project.lines.length} material lines · {unitSummary || 'No quantities yet'}</p></div><ArrowDown className="size-4 text-[#819087]" /></div><div className="mt-3 rounded-lg border border-white/[0.07] bg-[#0e1512] p-3"><div className="flex justify-between text-xs text-[#9aa79e]"><span>Grand total</span><span className="font-semibold text-[#c5e3b6]">{formatMoney(costs.total, project.currency)}</span></div><div className="mt-2 flex justify-between text-xs text-[#9aa79e]"><span>Materials</span><span>{formatMoney(costs.subtotal, project.currency)}</span></div></div></section>

            <section className={`${cardClass} p-4`}><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-[#e4eae3]">Saved estimates</h3><span className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-[#9ba79d]">{savedProjects.length}</span></div>{savedProjects.length ? <div className="mt-3 space-y-2">{savedProjects.slice(0, 4).map((saved) => <div key={saved.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-[#0e1512] p-3"><button type="button" onClick={() => { setProject(structuredClone(saved.project)); setNotice('Saved project loaded') }} className="min-w-0 text-left"><span className="block truncate text-xs font-semibold text-[#dbe4db]">{saved.project.name || 'Untitled project'}</span><span className="mt-1 block text-[10px] text-[#78867d]">{new Date(saved.savedAt).toLocaleDateString()}</span></button><span className="shrink-0 text-xs font-semibold text-[#bdd9b0]">{formatMoney(saved.total, saved.project.currency)}</span></div>)}</div> : <p className="mt-3 rounded-lg border border-dashed border-white/10 px-3 py-4 text-center text-xs leading-5 text-[#77847b]">Saved projects stay available in this browser.</p>}</section>
          </aside>
        </div>

        <footer className="mt-10 flex flex-col gap-2 border-t border-white/[0.08] pt-5 text-[11px] text-[#758279] sm:flex-row sm:items-center sm:justify-between"><p>Yiminum Build Intelligence <span className="px-1.5 text-[#48544c]">/</span> Estimates are planning aids; verify rates and quantities with project professionals.</p><Link href="/management" className="inline-flex items-center gap-1.5 hover:text-[#b8dba6]">Back to management <ArrowRight className="size-3.5" /><ArrowUpRight className="size-3" /></Link></footer>
      </div>
      {notice && <div role="status" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-[#a5d392]/20 bg-[#18231c] px-4 py-3 text-sm font-medium text-[#c7e4b9] shadow-xl"><Check className="size-4" />{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')} className="ml-2 text-[#95a293] hover:text-white"><X className="size-4" /></button></div>}
    </main>
  )
}