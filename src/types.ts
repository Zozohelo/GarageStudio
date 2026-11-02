export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'lpg' | 'other'

export type Vehicle = {
  id: string
  nickname: string
  make: string
  model: string
  trim?: string
  year: number
  plate: string
  vin?: string
  color?: string
  bodyStyle?: string
  fuelType: FuelType
  mileage: number
  mileageDate: string
  purchaseDate?: string
  purchasePrice?: number
  monthlyPayment?: number
  notes?: string
  modelBlob?: Blob
  photoBlob?: Blob
  createdAt: string
}

export type FuelRecord = {
  id: string
  vehicleId: string
  date: string
  odometer: number
  station?: string
  fuelType: FuelType
  quantity: number
  unitPrice: number
  total: number
  fullTank: boolean
  notes?: string
}

export type ServiceRecord = {
  id: string
  vehicleId: string
  date: string
  odometer: number
  provider?: string
  category: string
  description: string
  parts: number
  labor: number
  other: number
  total: number
  nextDate?: string
  nextOdometer?: number
  notes?: string
}

export type ExpenseRecord = {
  id: string
  vehicleId: string
  date: string
  category: string
  amount: number
  vendor?: string
  odometer?: number
  description?: string
}

export type FinancePlan = {
  id: string
  vehicleId: string
  purchasePrice: number
  downPayment: number
  financedAmount: number
  monthlyPayment: number
  installments: number
  paidInstallments?: number
  paymentDay: number
  provider?: string
  startDate: string
}

export type FinancePayment = {
  id: string
  planId: string
  vehicleId: string
  date: string
  amount: number
  principal?: number
  interest?: number
  notes?: string
}

export type Transaction = {
  id: string
  vehicleId: string
  date: string
  type: 'fuel' | 'service' | 'expense' | 'finance'
  title: string
  subtitle: string
  amount: number
  icon: string
}