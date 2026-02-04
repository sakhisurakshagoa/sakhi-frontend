export default function PDFsPage() {
  const pdfs = [
    {
      title: "Women Legal Rights Handbook",
      description: "Know your fundamental and legal rights",
      file: "/pdfs/legal-rights.pdf",
    },
    {
      title: "Workplace Safety Guide",
      description: "Safety rules every woman should know",
      file: "/pdfs/workplace-safety.pdf",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#f7f9ff] to-[#eef2ff]">
      <h1 className="text-3xl font-bold text-center mb-10">
        Educational PDFs
      </h1>

      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
        {pdfs.map((pdf, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {pdf.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pdf.description}
            </p>
            <a
              href={pdf.file}
              target="_blank"
              className="inline-block text-indigo-600 font-medium"
            >
              View / Download PDF →
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
