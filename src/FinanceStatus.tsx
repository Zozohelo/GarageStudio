import { CreditCard, Edit3, Landmark } from 'lucide-react'
import { money } from './calculations'
import type { FinancePayment, FinancePlan, Vehicle } from './types'

export function FinanceStatus({ vehicle, plan, payments, onEdit }: { vehicle?: Vehicle; plan?: FinancePlan; payments: FinancePayment[]; onEdit: () => void }) {
  if (!vehicle) return null
  const paid = payments.reduce((sum, payment) => sum + (payment.principal ?? payment.amount), 0)
  const financed = plan?.financedAmount || 0
  const remaining = Math.max(0, financed - paid)
  const months = plan?.monthlyPayment && remaining > 0 ? Math.ceil(remaining / plan.monthlyPayment) : 0
  const configured = Boolean(plan && plan.purchasePrice > 0 && plan.monthlyPayment > 0)
  const paidInstallments = plan?.paidInstallments ?? payments.length
  const installmentProgress = plan?.installments ? Math.min(100, (paidInstallments / plan.installments) * 100) : 0

  return <section className="finance-status">
    <div className="finance-status-heading"><div className="finance-status-icon"><Landmark size={18} /></div><div><p className="eyebrow">TULAJDONJOG ÉS RÉSZLETEK</p><h3>Még ennyit fizetsz az autóért</h3><span>{configured ? 'A vételár és a havi részlet alapján' : 'A pontos állapothoz add meg a vételárat és a havi részletet.'}</span></div><button className="icon-button" onClick={onEdit} aria-label="Finanszírozás szerkesztése" title="Finanszírozás szerkesztése"><Edit3 size={16} /></button></div>
    <div className="finance-status-grid"><div><span>Hátralévő összeg</span><strong>{configured ? (remaining > 0 ? money(remaining) : 'Kifizetve') : '—'}</strong></div><div><span>Hátralévő idő</span><strong>{configured ? (months ? `${months} hónap` : 'Kifizetve') : '—'}</strong></div><div><span>Havi részlet</span><strong>{configured ? money(plan?.monthlyPayment || 0) : '—'}</strong></div><div><span>Eddig befizetve</span><strong>{plan && paid ? money(paid) : '—'}</strong></div></div>
    <div className="finance-progress"><div><span>Teljesített részletek</span><strong>{plan?.installments ? `${paidInstallments} / ${plan.installments}` : `${paidInstallments} befizetés`}</strong></div><div className="progress-line"><span style={{ width: `${installmentProgress}%` }} /></div></div>
    <div className="finance-status-note"><CreditCard size={14} /> A részletfizetéseket a gyorsműveletek között tudod igazolni.</div>
  </section>
}
