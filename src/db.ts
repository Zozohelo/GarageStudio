import Dexie, { type Table } from 'dexie'
import type { ExpenseRecord, FinancePayment, FinancePlan, FuelRecord, ServiceRecord, Vehicle } from './types'

class GarageDatabase extends Dexie {
  vehicles!: Table<Vehicle, string>
  fuel!: Table<FuelRecord, string>
  services!: Table<ServiceRecord, string>
  expenses!: Table<ExpenseRecord, string>
  financePlans!: Table<FinancePlan, string>
  financePayments!: Table<FinancePayment, string>

  constructor() {
    super('garage-studio')
    this.version(1).stores({
      vehicles: 'id, make, model, createdAt',
      fuel: 'id, vehicleId, date',
      services: 'id, vehicleId, date',
      expenses: 'id, vehicleId, date, category',
      financePlans: 'id, vehicleId',
      financePayments: 'id, vehicleId, planId, date',
    })
  }
}

export const db = new GarageDatabase()

export const makeId = () => crypto.randomUUID()

export async function deleteVehicleData(vehicleId: string) {
  const plan = await db.financePlans.where('vehicleId').equals(vehicleId).first()
  await Promise.all([
    db.vehicles.delete(vehicleId),
    db.fuel.where('vehicleId').equals(vehicleId).delete(),
    db.services.where('vehicleId').equals(vehicleId).delete(),
    db.expenses.where('vehicleId').equals(vehicleId).delete(),
    db.financePlans.where('vehicleId').equals(vehicleId).delete(),
    db.financePayments.where('vehicleId').equals(vehicleId).delete(),
    plan ? db.financePayments.where('planId').equals(plan.id).delete() : Promise.resolve(),
  ])
}