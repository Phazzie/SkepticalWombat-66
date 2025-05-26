import Link from "next/link"
import { ArrowRight, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 to-amber-50">
      <header className="sticky top-0 z-10 border-b border-orange-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/wombat-serious.jpeg"
              alt="Skeptical Wombat"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Skeptical Wombat</h1>
              <p className="text-xs text-slate-500">Relationship Reality Check</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-orange-600">
              How It Works
            </Link>
            <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-orange-600">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
                  Stop. Fighting. In. Circles.
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  Let&apos;s sort this mess out.
                </h2>
                <p className="text-lg text-slate-600 md:text-xl">
                  I&apos;m tired of watching you have the same stupid fight over and over. Time for some actual
                  problem-solving instead of whatever <em>this</em> is.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Link href="/session/new">
                    <Users className="mr-2 h-5 w-5" />
                    Start Sorting This Out
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  See How This Works
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>No BS tolerance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Actual solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Reality checks included</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src="/images/wombat-casual.png"
                  alt="Skeptical Wombat throwing shade"
                  className="h-80 w-80 object-contain"
                />
                <div className="absolute -bottom-4 -right-4 rounded-lg bg-white p-3 shadow-lg">
                  <p className="text-sm font-medium text-slate-700">
                    &quot;Oh, you want to <em>communicate</em>? How novel.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-orange-200/50 bg-white py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">The &quot;Actually Fix This&quot; Process</h2>
              <p className="mb-12 text-lg text-slate-600">
                Five phases designed to prevent your usual relationship shenanigans.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-5">
              {[
                {
                  phase: 1,
                  title: "Issue Agreement",
                  description: "Figure out what you're actually fighting about. Revolutionary concept.",
                  color: "orange",
                },
                {
                  phase: 2,
                  title: "Perspective Proof",
                  description: "Prove you understand their side before whining about yours.",
                  color: "amber",
                },
                {
                  phase: 3,
                  title: "Statement Lock",
                  description: "Say what you mean. No take-backs. No 'that's not what I meant.'",
                  color: "yellow",
                },
                {
                  phase: 4,
                  title: "Supervised Chat",
                  description: "Talk it out while I call out your manipulation tactics.",
                  color: "lime",
                },
                {
                  phase: 5,
                  title: "Actual Solution",
                  description: "Solve the problem instead of just complaining about it forever.",
                  color: "green",
                },
              ].map((step) => (
                <Card key={step.phase} className="relative overflow-hidden border-orange-200/50">
                  <div className={`absolute top-0 left-0 h-1 w-full bg-${step.color}-500`}></div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-bold">
                      {step.phase}
                    </div>
                    <h3 className="mb-2 font-bold text-slate-900">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-16">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-orange-200 px-4 py-2 text-sm font-medium text-orange-800">
                  Why This Actually Works
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Your relationship deserves better than endless bickering
                </h2>
                <p className="text-lg text-slate-600">
                  I&apos;ve seen every manipulation tactic, deflection strategy, and communication failure in the book.
                  This process creates a structure that prevents all of them.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "No more talking past each other",
                    description:
                      "You literally cannot proceed until you prove you understand each other. Wild concept.",
                    icon: "💬",
                  },
                  {
                    title: "No more goalpost moving",
                    description: "Once statements are locked, there's no 'that's not what I meant' nonsense.",
                    icon: "🎯",
                  },
                  {
                    title: "No more manipulation tactics",
                    description: "I'll call out your deflection, gaslighting, and other greatest hits in real-time.",
                    icon: "🚨",
                  },
                  {
                    title: "Actual documented solutions",
                    description: "You'll have a real agreement, not just 'we talked about it' vagueness.",
                    icon: "📋",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                      {benefit.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                      <p className="text-sm text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="container text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <img
                src="/images/wombat-serious.jpeg"
                alt="Serious Skeptical Wombat"
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <h2 className="text-3xl font-bold">Ready to stop wasting time?</h2>
              <p className="text-lg text-slate-300">
                Look, you can keep having the same fight for the next five years, or you can spend 30 minutes actually
                fixing it. Your choice.
              </p>
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link href="/session/new">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Fine, Let&apos;s Fix This
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-orange-200/50 bg-white">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/wombat-serious.jpeg"
              alt="Skeptical Wombat"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-sm text-slate-500">© 2025 Skeptical Wombat. All rights reserved.</p>
          </div>
          <nav className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-orange-600">
              Terms
            </Link>
            <Link href="#" className="hover:text-orange-600">
              Privacy
            </Link>
            <Link href="#" className="hover:text-orange-600">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
