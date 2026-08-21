import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <section className="flex min-h-[60vh] flex-col justify-center py-16">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Marlees Portfolio
          </h1>
          <p className="mt-4 max-w-prose text-lg text-ink-muted">
            Selected work, projects, and experiments.
          </p>
        </section>
        <section id="work" className="border-t border-line py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Work</h2>
          <p className="mt-3 text-ink-muted">Coming soon.</p>
        </section>
        <section id="about" className="border-t border-line py-16">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 text-ink-muted">Coming soon.</p>
        </section>
        <section id="contact" className="border-t border-line py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-3 text-ink-muted">Coming soon.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
