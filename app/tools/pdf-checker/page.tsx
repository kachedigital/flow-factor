import PDFCheckerClient from "./pdf-checker-client"

export const metadata = {
  title: "PDF Accessibility Checker | Flow Factor",
  description: "Scan your PDF documents for accessibility issues and get recommendations for improvement.",
}

export default function PDFCheckerPage() {
  return <PDFCheckerClient />
}
