import type { ExpenseRecord, FinancePayment, FuelRecord, ServiceRecord, Transaction } from './types'

export const money = (value: number, currency = 'HUF') =>
  new Intl.NumberFormat('hu-HU', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)

export const number = (value: number) => new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 }).format(value)

export const shortDate = (date: string) => new Intl.DateTimeFormat('hu-HU', { month: 'short', day: 'numeric' }).format(new Date(date))

export function getTransactions(fuel: FuelRecord[], services: ServiceRecord[], expenses: ExpenseRecord[], payments: FinancePayment[]): Transaction[] {
  return [
    ...fuel.map((item) => ({ id: item.id, vehicleId: item.vehicleId, date: item.date, type: 'fuel' as const, title: 'Tankolás', subtitle: `${item.quantity} l · ${item.station || 'Ismeretlen kút'}`, amount: item.total, icon: 'fuel' })),
    ...services.map((item) => ({ id: item.id, vehicleId: item.vehicleId, date: item.date, type: 'service' as const, title: item.category, subtitle: item.provider || item.description, amount: item.total, icon: 'wrench' })),
    ...expenses.map((item) => ({ id: item.id, vehicleId: item.vehicleId, date: item.date, type: 'expense' as const, title: item.category, subtitle: item.vendor || item.description || 'Egyéb kiadás', amount: item.amount, icon: 'receipt' })),
    ...payments.map((item) => ({ id: item.id, vehicleId: item.vehicleId, date: item.date, type: 'finance' as const, title: 'Finanszírozási részlet', subtitle: item.notes || 'Igazolt befizetés', amount: item.amount, icon: 'credit-card' })),
  ].sort((a, b) => b.date.localeCompare(a.date))
}

export function monthTotal(transactions: Transaction[], month = new Date().toISOString().slice(0, 7)) {
  return transactions.filter((item) => item.date.startsWith(month)).reduce((sum, item) => sum + item.amount, 0)
}

export function fuelConsumption(records: FuelRecord[]) {
  const fullTanks = records.filter((record) => record.fullTank).sort((a, b) => a.odometer - b.odometer)
  if (fullTanks.length < 2) return null
  const first = fullTanks[0]
  const last = fullTanks[fullTanks.length - 1]
  const distance = last.odometer - first.odometer
  const litres = fullTanks.slice(1).reduce((sum, record) => sum + record.quantity, 0)
  return distance > 0 && litres > 0 ? (litres / distance) * 100 : null
}