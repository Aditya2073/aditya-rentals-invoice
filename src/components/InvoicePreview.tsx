import { forwardRef } from "react";
import { InvoiceData } from "./InvoiceForm";
interface InvoicePreviewProps {
  data: InvoiceData;
}
export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({
  data
}, ref) => {
  return <div ref={ref} className="bg-background p-8 shadow-lg mx-auto" style={{
    width: "210mm",
    minHeight: "297mm"
  }}>
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-business-header">
          <h1 className="text-4xl font-bold text-business-header mb-2">
            ADITYA TOURS & TRAVELS
          </h1>
          <p className="text-muted-foreground">Car Rental Services</p>
        </div>

        {/* Invoice Info and Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-semibold text-lg mb-3 text-foreground">Invoice Details</h2>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Invoice No:</span> {data.invoiceNumber}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Date:</span> {data.date}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Payment Mode:</span> {data.paymentMode}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-3 text-foreground">Customer Details</h2>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Name:</span> {data.customerName}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span> {data.phone}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Address:</span> {data.address}
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle Details Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-table-header">
                <th className="border border-table-border p-3 text-left text-sm font-semibold text-foreground">
                  Sr. No.
                </th>
                <th className="border border-table-border p-3 text-left text-sm font-semibold text-foreground">
                  Description
                </th>
                <th className="border border-table-border p-3 text-right text-sm font-semibold text-foreground">
                  Extra Charges
                </th>
                <th className="border border-table-border p-3 text-left text-sm font-semibold text-foreground">
                  Rental Period
                </th>
                <th className="border border-table-border p-3 text-right text-sm font-semibold text-foreground">
                  Rate/Day
                </th>
                <th className="border border-table-border p-3 text-right text-sm font-semibold text-foreground">
                  Total KM
                </th>
                <th className="border border-table-border p-3 text-right text-sm font-semibold text-foreground">
                  Rate/KM
                </th>
                <th className="border border-table-border p-3 text-right text-sm font-semibold text-foreground">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {data.vehicles.map((vehicle, index) => <tr key={vehicle.id}>
                  <td className="border border-table-border p-3 text-sm text-muted-foreground">
                    {index + 1}
                  </td>
                  <td className="border border-table-border p-3 text-sm text-muted-foreground">
                    {vehicle.description}
                  </td>
                  <td className="border border-table-border p-3 text-right text-sm text-muted-foreground">
                    {vehicle.extraCharges && `₹${vehicle.extraCharges}`}
                  </td>
                  <td className="border border-table-border p-3 text-sm text-muted-foreground">
                    {vehicle.rentalPeriod}
                  </td>
                  <td className="border border-table-border p-3 text-right text-sm text-muted-foreground">
                    {vehicle.ratePerDay && `₹${vehicle.ratePerDay}`}
                  </td>
                  <td className="border border-table-border p-3 text-right text-sm text-muted-foreground">
                    {vehicle.totalKM}
                  </td>
                  <td className="border border-table-border p-3 text-right text-sm text-muted-foreground">
                    {vehicle.ratePerKM && `₹${vehicle.ratePerKM}`}
                  </td>
                  <td className="border border-table-border p-3 text-right text-sm font-medium text-foreground">
                    {vehicle.subtotal && `₹${vehicle.subtotal}`}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end mb-12">
          <div className="w-64">
            <div className="flex justify-between items-center bg-business-header text-primary-foreground p-4 rounded">
              <span className="font-bold text-lg">Total Amount:</span>
              <span className="font-bold text-xl">{data.totalAmount && `₹${data.totalAmount}`}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border mt-auto">
          <div>
            <p className="font-medium text-foreground mb-2">Received by:</p>
            <div className="border-b border-border w-48 mt-8"></div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg text-foreground mb-1">Ganesh Rasal</p>
            <p className="font-bold text-xl text-business-header">ADITYA TOURS & TRAVELS</p>
          </div>
        </div>
      </div>;
});
InvoicePreview.displayName = "InvoicePreview";