import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Plus, Trash2, Download, Check } from "lucide-react";
import { InvoiceData, VehicleRow } from "./InvoiceForm";
import { InvoicePreview } from "./InvoicePreview";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

interface MobileInvoiceWizardProps {
  initialData: InvoiceData;
  onDataChange: (data: InvoiceData) => void;
}

export const MobileInvoiceWizard = ({ initialData, onDataChange }: MobileInvoiceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InvoiceData>(initialData);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateField = (field: keyof InvoiceData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const updateVehicle = (id: string, field: keyof VehicleRow, value: string) => {
    const newData = {
      ...formData,
      vehicles: formData.vehicles.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
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

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice_${formData.invoiceNumber || "Draft"}`,
    onAfterPrint: () => toast.success("Invoice saved as PDF!"),
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Invoice Details";
      case 2: return "Customer Details";
      case 3: return "Vehicle Details";
      case 4: return "Review & Generate";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <header className="bg-business-header text-primary-foreground py-4 shadow-md sticky top-0 z-10">
        <div className="px-4">
          <h1 className="text-xl font-bold">Invoice Generator</h1>
          <p className="text-primary-foreground/80 text-sm">Aditya Tours & Travels</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-background py-4 px-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-muted-foreground">{getStepTitle()}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="px-4 py-6">
        {currentStep === 1 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Invoice Details</h2>
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input 
                id="invoiceNumber" 
                value={formData.invoiceNumber} 
                onChange={e => updateField("invoiceNumber", e.target.value)} 
                placeholder="INV-001" 
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date} 
                onChange={e => updateField("date", e.target.value)} 
              />
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Customer Details</h2>
            <div>
              <Label htmlFor="customerName">Name</Label>
              <Input 
                id="customerName" 
                value={formData.customerName} 
                onChange={e => updateField("customerName", e.target.value)} 
                placeholder="Customer Name" 
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={e => updateField("phone", e.target.value)} 
                placeholder="Phone Number" 
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                value={formData.address} 
                onChange={e => updateField("address", e.target.value)} 
                placeholder="Customer Address" 
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="paymentMode">Mode of Payment</Label>
              <Input 
                id="paymentMode" 
                value={formData.paymentMode} 
                onChange={e => updateField("paymentMode", e.target.value)} 
                placeholder="e.g., Cash, UPI, Check" 
              />
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Vehicle Details</h2>
              <Button onClick={addVehicleRow} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
            
            {formData.vehicles.map((vehicle, index) => (
              <Card key={vehicle.id} className="p-4 space-y-4 bg-muted/30">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground">Vehicle {index + 1}</h3>
                  {formData.vehicles.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeVehicleRow(vehicle.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={vehicle.description} 
                    onChange={e => updateVehicle(vehicle.id, "description", e.target.value)} 
                    placeholder="e.g., Sedan - Honda City"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Charges</Label>
                    <Input 
                      type="number" 
                      value={vehicle.extraCharges} 
                      onChange={e => updateVehicle(vehicle.id, "extraCharges", e.target.value)} 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <Label>Rental Period</Label>
                    <Input 
                      value={vehicle.rentalPeriod} 
                      onChange={e => updateVehicle(vehicle.id, "rentalPeriod", e.target.value)} 
                      placeholder="e.g., 3 Days" 
                    />
                  </div>
                  <div>
                    <Label>Rate per Day</Label>
                    <Input 
                      type="number" 
                      value={vehicle.ratePerDay} 
                      onChange={e => updateVehicle(vehicle.id, "ratePerDay", e.target.value)} 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <Label>Total KM</Label>
                    <Input 
                      type="number" 
                      value={vehicle.totalKM} 
                      onChange={e => updateVehicle(vehicle.id, "totalKM", e.target.value)} 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <Label>Rate per KM</Label>
                    <Input 
                      type="number" 
                      value={vehicle.ratePerKM} 
                      onChange={e => updateVehicle(vehicle.id, "ratePerKM", e.target.value)} 
                      placeholder="0" 
                    />
                  </div>
                  <div>
                    <Label>Subtotal</Label>
                    <Input 
                      type="number" 
                      value={vehicle.subtotal} 
                      onChange={e => updateVehicle(vehicle.id, "subtotal", e.target.value)} 
                      placeholder="0" 
                    />
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-4">
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input 
                id="totalAmount" 
                type="number" 
                value={formData.totalAmount} 
                onChange={e => updateField("totalAmount", e.target.value)} 
                placeholder="0" 
              />
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Check className="h-6 w-6 text-green-600" />
                Invoice Ready!
              </h2>
              <p className="text-muted-foreground mb-4">
                Review your invoice below and tap "Save as PDF" to download.
              </p>
              <Button onClick={handlePrint} className="w-full gap-2" size="lg">
                <Download className="h-5 w-5" />
                Save as PDF
              </Button>
            </Card>

            <Card className="p-4 overflow-hidden">
              <div className="overflow-auto">
                <div className="transform scale-50 origin-top-left" style={{ width: "200%", height: "auto" }}>
                  <InvoicePreview data={formData} />
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Hidden full-size invoice for printing only */}
        <div className="hidden print:block">
          <InvoicePreview ref={invoiceRef} data={formData} />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={currentStep === totalSteps}
            className="flex-1"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
