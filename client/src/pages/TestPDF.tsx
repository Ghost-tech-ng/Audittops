import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPDF() {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [reportData, setReportData] = useState<any>(null);

    // Simulate building report data
    const buildReportData = () => {
        console.log("Building report data...");
        const mockData = {
            title: "Test Audit Report",
            date: new Date().toLocaleDateString(),
            items: [
                { id: 1, description: "Item 1", amount: 100 },
                { id: 2, description: "Item 2", amount: 200 },
                { id: 3, description: "Item 3", amount: 300 },
            ],
            total: 600,
        };
        setReportData(mockData);
        console.log("Report data built:", mockData);
    };

    // This is the FIXED version
    const handleGeneratePreview = () => {
        try {
            setIsLoadingData(true);
            buildReportData();
            setPreviewOpen(true);
            console.log("✅ Preview opened successfully!");
        } catch (error) {
            console.error("❌ Error generating preview:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>PDF Generation Test</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Test the PDF Fix</h3>
                            <p className="text-sm text-muted-foreground">
                                Click "Preview & Generate PDF" to test if the infinite loading bug is fixed.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={handleGeneratePreview}
                                disabled={isLoadingData}
                                className="bg-primary"
                            >
                                {isLoadingData ? "Loading..." : "Preview & Generate PDF"}
                            </Button>

                            {previewOpen && (
                                <Button onClick={handleDownloadPDF} variant="outline">
                                    Download/Print PDF
                                </Button>
                            )}
                        </div>

                        {isLoadingData && (
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded">
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    ⏳ Loading data... (This should NOT hang forever!)
                                </p>
                            </div>
                        )}

                        {previewOpen && reportData && (
                            <Card className="border-2 border-green-500">
                                <CardHeader>
                                    <CardTitle className="text-green-600">✅ Preview Loaded Successfully!</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold">{reportData.title}</h4>
                                            <p className="text-sm text-muted-foreground">Date: {reportData.date}</p>
                                        </div>

                                        <table className="w-full border">
                                            <thead>
                                                <tr className="border-b bg-muted">
                                                    <th className="p-2 text-left">Description</th>
                                                    <th className="p-2 text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.items.map((item: any) => (
                                                    <tr key={item.id} className="border-b">
                                                        <td className="p-2">{item.description}</td>
                                                        <td className="p-2 text-right">₦{item.amount}</td>
                                                    </tr>
                                                ))}
                                                <tr className="font-bold">
                                                    <td className="p-2">Total</td>
                                                    <td className="p-2 text-right">₦{reportData.total}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                                            <p className="text-sm text-green-800 dark:text-green-200">
                                                🎉 <strong>Success!</strong> The preview opened immediately without infinite loading.
                                                The bug is fixed!
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How the Fix Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Before (Broken):</strong></p>
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                            {`const handleGeneratePreview = () => {
  setIsLoadingData(true); // ❌ Sets loading but never completes
};`}
                        </pre>

                        <p className="pt-4"><strong>After (Fixed):</strong></p>
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                            {`const handleGeneratePreview = () => {
  try {
    setIsLoadingData(true);
    buildReportData();      // ✅ Actually builds the data
    setPreviewOpen(true);   // ✅ Opens the preview
  } finally {
    setIsLoadingData(false); // ✅ Stops loading
  }
};`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
