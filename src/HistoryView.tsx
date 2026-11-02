import { useState } from 'react'
import { Download, Fuel, CreditCard, History as HistoryIcon, Receipt, Search, Trash2, Wrench } from 'lucide-react'
import { money, shortDate } from './calculations'
import type { Transaction, Vehicle } from './types'
import './App.css'

type Props = {
  vehicles: Vehicle[]
  transactions: Transaction[]
  onDelete: (transaction: Transaction) => Promise<void>
}

const icons: Record<string, React.ReactNode> = {
  fuel: <Fuel size={16} />,
  wrench: <Wrench size={16} />,
  receipt: <Receipt size={16} />,
  'credit-card': <CreditCard size={16} />,
}

export function HistoryView({ vehicles, transactions, onDelete }: Props) {
  const [query, setQuery] = useState('')
  const [vehicleFilter, setVehicleFilter] = useState('all')
  const filtered = transactions.filter((transaction) =>
    (vehicleFilter === 'all' || transaction.vehicleId === vehicleFilter) &&
    `${transaction.title} ${transaction.subtitle}`.toLowerCase().includes(query.toLowerCase()),
  )
  const total = filtered.reduce((sum, item) => sum + item.amount, 0)

  return <>
    <div className="page-heading-row">
      <div><p className="eyebrow">NAPLÓ</p><h2>Összes előzmény</h2><p className="subheading">Minden rögzített mozgás egy helyen</p></div>
      <button className="ghost-button"><Download size={16} /> CSV export</button>
    </div>
    <div className="history-summary"><div><span>Szűrt rekordok</span><strong>{filtered.length}</strong></div><div><span>Összesen</span><strong>{money(total)}</strong></div><div><span>Adatforrás</span><strong>Helyi tárhely</strong></div></div>
    <div className="toolbar history-toolbar">
      <div className="search-box"><Search size={16} /><input placeholder="Keresés a tételek között…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <select value={vehicleFilter} onChange={(event) => setVehicleFilter(event.target.value)}><option value="all">Minden jármű</option>{vehicles.map((vehicle) => <option value={vehicle.id} key={vehicle.id}>{vehicle.nickname}</option>)}</select>
    </div>
    <div className="history-list">{filtered.length ? filtered.map((transaction) => <div className="history-row" key={`${transaction.type}-${transaction.id}`}>
      <div className="activity-item"><div className={`activity-icon ${transaction.type}`}>{icons[transaction.icon]}</div><div className="activity-info"><strong>{transaction.title}</strong><span>{transaction.subtitle}</span></div><div className="activity-amount"><strong>{money(transaction.amount)}</strong><span>{shortDate(transaction.date)}</span></div></div>
      <span className="history-vehicle">{vehicles.find((vehicle) => vehicle.id === transaction.vehicleId)?.nickname}</span>
      <button className="icon-button danger" onClick={() => void onDelete(transaction)} aria-label="Előzmény törlése" title="Előzmény törlése"><Trash2 size={17} /></button>
    </div>) : <div className="empty-state"><HistoryIcon size={30} /><h3>Még nincs rögzített adat</h3><p>A dashboard gyorsműveleteivel pillanatok alatt hozhatsz létre új bejegyzést.</p></div>}</div>
  </>
}
