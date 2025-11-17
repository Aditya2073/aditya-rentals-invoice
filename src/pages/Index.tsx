import { useState, useRef } from "react";
import { InvoiceForm } from "@/components/InvoiceForm";
import type { InvoiceData } from "@/types/invoice";
import { InvoicePreview } from "@/components/InvoicePreview";
import { MobileInvoiceWizard } from "@/components/MobileInvoiceWizard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    phone: "",
    address: "",
    paymentMode: "Cash",
    vehicles: [
      {
        id: "1",
        description: "",
        extraCharges: "",
        rentalPeriod: "",
        ratePerDay: "",
        totalKM: "",
        ratePerKM: "",
        subtotal: "",
      },
    ],
    totalAmount: "",
  });

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice_${invoiceData.invoiceNumber || "Draft"}`,
    onAfterPrint: () => toast.success("Invoice printed successfully!"),
  });

  const handleDownload = () => {
    handlePrint();
    toast.success("Invoice ready to save as PDF!");
  };

  // Mobile view: Show step-by-step wizard
  if (isMobile) {
    return <MobileInvoiceWizard initialData={invoiceData} onDataChange={setInvoiceData} />;
  }

  // Desktop view: Show side-by-side layout
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-business-header text-primary-foreground py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Invoice Generator</h1>
          <p className="text-primary-foreground/80 mt-1">Aditya Tours & Travels</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="p-6 bg-card">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Create Invoice</h2>
              <InvoiceForm onDataChange={setInvoiceData} initialData={invoiceData} />
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="p-6 bg-card sticky top-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Preview</h2>
                <div className="flex gap-2">
                  <Button onClick={handlePrint} className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button onClick={handleDownload} variant="secondary" className="gap-2">
                    <Download className="h-4 w-4" />
                    Save PDF
                  </Button>
                </div>
              </div>
              <div className="overflow-auto max-h-[calc(100vh-200px)] border rounded-lg bg-background">
                <div ref={invoiceRef} className="transform scale-75 origin-top-left" style={{ width: "133%" }}>
                  <InvoicePreview data={invoiceData} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
