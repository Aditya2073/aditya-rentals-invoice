export interface VehicleRow {
  id: string;
  description: string;
  extraCharges: string;
  rentalPeriod: string;
  ratePerDay: string;
  totalKM: string;
  ratePerKM: string;
  subtotal: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMode: string;
  vehicles: VehicleRow[];
  totalAmount: string;
}
