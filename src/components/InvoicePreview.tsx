import type { InvoiceData } from "@/types/invoice";

interface InvoicePreviewProps {
  data: InvoiceData;
}

export const InvoicePreview = ({ data }: InvoicePreviewProps) => {
  return (
    <div className="bg-background p-8 shadow-lg mx-auto" style={{
      width: "210mm",
      minHeight: "297mm"
    }}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-business-header">
        <h1 className="text-4xl font-bold text-business-header mb-2">
          ADITYA TOURS & TRAVELS
        </h1>
        <p className="text-foreground text-sm">
          B-202, Radha Palace, Diwanman, Vasai West, Palghar, 401202
        </p>
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
                Charges
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
            {data.vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td className="border border-table-border p-3 text-sm text-muted-foreground">
                  {index + 1}
                </td>
                <td className="border border-table-border p-3 text-sm text-muted-foreground">
                  {vehicle.description}
                </td>
                <td className="border border-table-border p-3 text-sm text-right text-muted-foreground">
                  {vehicle.extraCharges ? `₹${vehicle.extraCharges}` : "-"}
                </td>
                <td className="border border-table-border p-3 text-sm text-muted-foreground">
                  {vehicle.rentalPeriod || "-"}
                </td>
                <td className="border border-table-border p-3 text-sm text-right text-muted-foreground">
                  {vehicle.ratePerDay ? `₹${vehicle.ratePerDay}` : "-"}
                </td>
                <td className="border border-table-border p-3 text-sm text-right text-muted-foreground">
                  {vehicle.totalKM || "-"}
                </td>
                <td className="border border-table-border p-3 text-sm text-right text-muted-foreground">
                  {vehicle.ratePerKM ? `₹${vehicle.ratePerKM}` : "-"}
                </td>
                <td className="border border-table-border p-3 text-sm text-right text-muted-foreground">
                  {vehicle.subtotal ? `₹${vehicle.subtotal}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mb-8 text-right">
        <p className="text-xl font-bold text-foreground">
          Total Amount: <span className="text-business-header">₹{data.totalAmount || "0"}</span>
        </p>
      </div>

      {/* Footer/Signature */}
      <div className="mt-12 pt-8 border-t-2 border-business-header flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Customer Signature</p>
          <div className="w-48 border-b-2 border-muted"></div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg text-foreground mb-1">Ganesh Rasal</p>
          <p className="font-bold text-xl text-business-header">ADITYA TOURS & TRAVELS</p>
        </div>
      </div>
    </div>
  );
};
