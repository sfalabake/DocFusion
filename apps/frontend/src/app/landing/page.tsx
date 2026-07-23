export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50">
      <section className="max-w-6xl mx-auto p-8 w-full">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">DocFusion</h1>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-primary-600 font-semibold">Sign in</a>
            <a href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg">Get started</a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-extrabold mb-6">Edit PDFs in your browser, like a pro</h2>
            <p className="text-lg text-secondary-600 mb-6">DocFusion is a production-ready PDF editing platform with real-time editing, collaboration, and AI tools.</p>
            <div className="flex gap-4">
              <a className="bg-primary-600 text-white px-6 py-3 rounded-lg shadow" href="/register">Start free</a>
              <a className="px-6 py-3 rounded-lg border" href="#features">Features</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="font-semibold mb-4">Quick demo</h3>
            <img alt="demo" src="/images/editor-demo.png" className="w-full rounded-lg" />
          </div>
        </div>

        <section id="features" className="mt-20">
          <h3 className="text-2xl font-bold mb-6">Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="p-4 bg-white rounded-lg shadow">Editor: Text & Image editing</li>
            <li className="p-4 bg-white rounded-lg shadow">Annotations & Comments</li>
            <li className="p-4 bg-white rounded-lg shadow">Signatures & Workflows</li>
          </ul>
        </section>

        <footer className="mt-20 text-center text-sm text-secondary-500">© {new Date().getFullYear()} DocFusion</footer>
      </section>
    </main>
  );
}
