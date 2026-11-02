import { useEffect, useState } from 'react'
import { Calculator, Check, CreditCard } from 'lucide-react'
import { money } from './calculations'
import type { FinancePayment, FinancePlan, Vehicle } from './types'

type Props = {
  vehicle?: Vehicle
  plan?: FinancePlan
  payments: FinancePayment[]
  onSave: (purchasePrice: number, monthlyPayment: number, paidInstallments: number) => Promise<void>
}

export function FinanceSettings({ vehicle, plan, payments, onSave }: Props) {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState('')
  const [paidInstallments, setPaidInstallments] = useState('0')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setPurchasePrice(String(plan?.purchasePrice || vehicle?.purchasePrice || ''))
    setMonthlyPayment(String(plan?.monthlyPayment || vehicle?.monthlyPayment || ''))
    setPaidInstallments(String(plan?.paidInstallments ?? payments.length))
  }, [plan, vehicle, payments.length])

  if (!vehicle) return <div className="empty-state"><CreditCard size={30} /><h3>Előbb adj hozzá egy járművet</h3><p>A finanszírozási adatok az aktív járműhöz kapcsolódnak.</p></div>

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    await onSave(Number(purchasePrice) || 0, Number(monthlyPayment) || 0, Math.max(0, Number(paidInstallments) || 0))
    setBusy(false)
  }

  return <section className="finance-settings settings-card"><div className="settings-icon red"><Calculator size={18} /></div><div className="finance-settings-copy"><p className="eyebrow">AKTÍV JÁRMŰ / {vehicle.nickname.toUpperCase()}</p><h3>Vételár és havi részlet</h3><p>Add meg, mennyiért vetted az autót, mennyit fizetsz havonta, és hány részletet teljesítettél eddig.</p></div><form className="finance-settings-form" onSubmit={handleSubmit}><label className="field"><span>Vételár (Ft)</span><input type="number" min="0" step="1000" value={purchasePrice} onChange={(event) => setPurchasePrice(event.target.value)} placeholder="pl. 8500000" /></label><label className="field"><span>Havi részlet (Ft)</span><input type="number" min="0" step="1000" value={monthlyPayment} onChange={(event) => setMonthlyPayment(event.target.value)} placeholder="pl. 180000" /></label><label className="field"><span>Eddig befizetett részletek</span><input type="number" min="0" step="1" value={paidInstallments} onChange={(event) => setPaidInstallments(event.target.value)} /></label><div className="finance-settings-preview"><span>Számított futamidő</span><strong>{purchasePrice && monthlyPayment && Number(monthlyPayment) > 0 ? `${Math.ceil(Number(purchasePrice) / Number(monthlyPayment))} hónap` : '—'}</strong><small>{plan?.purchasePrice ? `Beállítva: ${money(plan.purchasePrice)}` : 'Még nincs beállítva'}</small></div><button className="primary-button" type="submit" disabled={busy}><Check size={16} /> {busy ? 'Mentés…' : 'Finanszírozás mentése'}</button></form></section>
}
