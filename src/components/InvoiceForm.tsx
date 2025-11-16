import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
interface InvoiceFormProps {
  onDataChange: (data: InvoiceData) => void;
  initialData: InvoiceData;
}
export const InvoiceForm = ({
  onDataChange,
  initialData
}: InvoiceFormProps) => {
  const [formData, setFormData] = useState<InvoiceData>(initialData);
  const updateField = (field: keyof InvoiceData, value: string) => {
    const newData = {
      ...formData,
      [field]: value
    };
    setFormData(newData);
    onDataChange(newData);
  };
  const addVehicleRow = () => {
    const newVehicle: VehicleRow = {
      id: Date.now().toString(),
      description: "",
      extraCharges: "",
      rentalPeriod: "",
      ratePerDay: "",
      totalKM: "",
      ratePerKM: "",
      subtotal: ""
    };
    const newData = {
      ...formData,
      vehicles: [...formData.vehicles, newVehicle]
    };
    setFormData(newData);
    onDataChange(newData);
    toast.success("Vehicle row added");
  };
  const removeVehicleRow = (id: string) => {
    if (formData.vehicles.length === 1) {
      toast.error("At least one vehicle is required");
      return;
    }
    const newData = {
      ...formData,
      vehicles: formData.vehicles.filter(v => v.id !== id)
    };
    setFormData(newData);
    onDataChange(newData);
    toast.success("Vehicle row removed");
  };
  const updateVehicle = (id: string, field: keyof VehicleRow, value: string) => {
    const newData = {
      ...formData,
      vehicles: formData.vehicles.map(v => v.id === id ? {
        ...v,
        [field]: value
      } : v)
    };
    setFormData(newData);
    onDataChange(newData);
  };
  return <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input id="invoiceNumber" value={formData.invoiceNumber} onChange={e => updateField("invoiceNumber", e.target.value)} placeholder="INV-001" />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={formData.date} onChange={e => updateField("date", e.target.value)} />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Customer Details</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="customerName">Name</Label>
            <Input id="customerName" value={formData.customerName} onChange={e => updateField("customerName", e.target.value)} placeholder="Customer Name" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={e => updateField("phone", e.target.value)} placeholder="Phone Number" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={formData.address} onChange={e => updateField("address", e.target.value)} placeholder="Customer Address" />
          </div>
          <div>
            <Label htmlFor="paymentMode">Mode of Payment</Label>
            <Input id="paymentMode" value={formData.paymentMode} onChange={e => updateField("paymentMode", e.target.value)} placeholder="e.g., Cash, UPI, Check" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Description</h2>
          <Button onClick={addVehicleRow} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
        <div className="space-y-4">
          {formData.vehicles.map((vehicle, index) => <Card key={vehicle.id} className="p-4 bg-muted/30">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-foreground">Sr No: {index + 1}</h3>
                <Button variant="ghost" size="sm" onClick={() => removeVehicleRow(vehicle.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="md:col-span-2 lg:col-span-3">
                  <Label>Description</Label>
                  <Textarea value={vehicle.description} onChange={e => updateVehicle(vehicle.id, "description", e.target.value)} placeholder="e.g., Sedan - Honda City" className="min-h-[100px]" />
                </div>
                <div>
                  <Label>Charges</Label>
                  <Input type="number" value={vehicle.extraCharges} onChange={e => updateVehicle(vehicle.id, "extraCharges", e.target.value)} placeholder="0" />
                </div>
                <div>
                  <Label>Rental Period</Label>
                  <Input value={vehicle.rentalPeriod} onChange={e => updateVehicle(vehicle.id, "rentalPeriod", e.target.value)} placeholder="e.g., 3 Days" />
                </div>
                <div>
                  <Label>Rate per Day</Label>
                  <Input type="number" value={vehicle.ratePerDay} onChange={e => updateVehicle(vehicle.id, "ratePerDay", e.target.value)} placeholder="0" />
                </div>
                <div>
                  <Label>Total KM</Label>
                  <Input type="number" value={vehicle.totalKM} onChange={e => updateVehicle(vehicle.id, "totalKM", e.target.value)} placeholder="0" />
                </div>
                <div>
                  <Label>Rate per KM</Label>
                  <Input type="number" value={vehicle.ratePerKM} onChange={e => updateVehicle(vehicle.id, "ratePerKM", e.target.value)} placeholder="0" />
                </div>
                <div>
                  <Label>Subtotal</Label>
                  <Input type="number" value={vehicle.subtotal} onChange={e => updateVehicle(vehicle.id, "subtotal", e.target.value)} placeholder="0" />
                </div>
              </div>
            </Card>)}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Total Amount</h2>
        <div>
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input id="totalAmount" type="number" value={formData.totalAmount} onChange={e => updateField("totalAmount", e.target.value)} placeholder="0" />
        </div>
      </Card>
    </div>;
};