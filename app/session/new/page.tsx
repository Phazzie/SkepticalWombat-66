"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProgressTracker } from "@/components/progress-tracker"

export default function NewSessionPage() {
  const [personA, setPersonA] = useState("")
  const [personB, setPersonB] = useState("")

  const handleNext = () => {
    if (personA && personB) {
      window.location.href = "/session/phase1"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 to-amber-50">
      <header className="sticky top-0 z-10 border-b border-orange-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/wombat-serious.jpeg"
              alt="Skeptical Wombat"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Skeptical Wombat</h1>
              <p className="text-xs text-slate-500">Session Setup</p>
            </div>
          </Link>
          <ProgressTracker currentPhase={0} />
        </div>
      </header>

      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-lg">
          <Card className="border-orange-200/50 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Let&apos;s Get Started</CardTitle>
              <CardDescription className="text-slate-600">
                Time to see if you two can actually agree on something as simple as your own names.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="relative rounded-lg bg-orange-50 p-4">
                <div className="flex items-start gap-3">
                  <img
                    src="/images/wombat-casual.png"
                    alt="Skeptical Wombat"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-slate-700">
                        Alright, let me guess. You&apos;ve tried &quot;talking it out&quot; and that went{" "}
                        <em>so well</em>
                        that you&apos;re here asking a wombat for help. Smart move, honestly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personA" className="text-slate-700">
                    Person A (The one setting this up)
                  </Label>
                  <Input
                    id="personA"
                    placeholder="Your name"
                    value={personA}
                    onChange={(e) => setPersonA(e.target.value)}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personB" className="text-slate-700">
                    Person B (Your partner in this mess)
                  </Label>
                  <Input
                    id="personB"
                    placeholder="Their name"
                    value={personB}
                    onChange={(e) => setPersonB(e.target.value)}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 p-4">
                <h3 className="mb-2 font-medium text-amber-800">Quick Reality Check</h3>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• This process takes about 30-45 minutes</li>
                  <li>• Both people need to participate honestly</li>
                  <li>• I will call out manipulation tactics</li>
                  <li>• You might actually solve something</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Never Mind
                </Link>
              </Button>
              <Button
                onClick={handleNext}
                disabled={!personA || !personB}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Let&apos;s Do This Thing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
