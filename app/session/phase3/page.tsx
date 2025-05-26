"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ProgressTracker } from "@/components/progress-tracker"
import { Textarea } from "@/components/ui/textarea"
import { WombatAvatar } from "@/components/wombat-avatar"
import { WombatSpeechBubble } from "@/components/wombat-speech-bubble"

export default function Phase3Page() {
  // In a real app, we would load data from previous phases
  const agreedIssue = "We disagree about how to manage our finances and spending habits."

  const [personAStatement, setPersonAStatement] = useState("")
  const [personBStatement, setPersonBStatement] = useState("")
  const [personALocked, setPersonALocked] = useState(false)
  const [personBLocked, setPersonBLocked] = useState(false)
  const [currentPerson, setCurrentPerson] = useState<"A" | "B">("A")

  const handleLockA = () => {
    setPersonALocked(true)
    setCurrentPerson("B")
  }

  const handleLockB = () => {
    setPersonBLocked(true)
  }

  const handleContinue = () => {
    window.location.href = "/session/phase4"
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <WombatAvatar outfit="business" size="sm" />
              <h1 className="text-xl font-bold">Skeptical Wombat</h1>
            </Link>
          </div>
          <ProgressTracker currentPhase={3} />
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Phase 3: Statement Locking</CardTitle>
              <CardDescription>
                Now you each get to state your position, but once you hit submit, no take-backs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <WombatSpeechBubble position="right">
                  {!personALocked &&
                    !personBLocked &&
                    "Time to put your cards on the table. And no, you can't change your mind later."}
                  {personALocked &&
                    !personBLocked &&
                    "Person A is locked in. Your turn, Person B. Choose your words carefully."}
                  {personALocked &&
                    personBLocked &&
                    "Statements locked. No more 'that's not what I meant' or 'you're twisting my words.' We have receipts now."}
                </WombatSpeechBubble>
                <div className="flex justify-end">
                  <WombatAvatar outfit="streetwear" size="md" />
                </div>
              </div>

              <div className="rounded-md bg-indigo-50 p-4">
                <div className="mb-2 text-sm font-medium text-indigo-800">Agreed Issue</div>
                <p className="text-indigo-700">{agreedIssue}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Person A's Statement</h3>
                    {personALocked && (
                      <div className="flex items-center gap-1 text-sm text-amber-600">
                        <Lock className="h-3 w-3" />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>

                  {currentPerson === "A" && !personALocked && (
                    <div className="space-y-2">
                      <Label htmlFor="personAStatement">State your position</Label>
                      <Textarea
                        id="personAStatement"
                        placeholder="What's your position on this issue?"
                        className="min-h-[150px]"
                        value={personAStatement}
                        onChange={(e) => setPersonAStatement(e.target.value)}
                      />
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500">Once locked, you cannot change this statement.</p>
                        <Button size="sm" onClick={handleLockA} disabled={!personAStatement.trim()} className="ml-auto">
                          <Lock className="mr-1 h-3 w-3" />
                          Lock Statement
                        </Button>
                      </div>
                    </div>
                  )}

                  {personALocked && (
                    <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                      <p className="text-sm text-amber-800">{personAStatement}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Person B's Statement</h3>
                    {personBLocked && (
                      <div className="flex items-center gap-1 text-sm text-amber-600">
                        <Lock className="h-3 w-3" />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>

                  {currentPerson === "B" && !personBLocked && (
                    <div className="space-y-2">
                      <Label htmlFor="personBStatement">State your position</Label>
                      <Textarea
                        id="personBStatement"
                        placeholder="What's your position on this issue?"
                        className="min-h-[150px]"
                        value={personBStatement}
                        onChange={(e) => setPersonBStatement(e.target.value)}
                      />
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500">Once locked, you cannot change this statement.</p>
                        <Button size="sm" onClick={handleLockB} disabled={!personBStatement.trim()} className="ml-auto">
                          <Lock className="mr-1 h-3 w-3" />
                          Lock Statement
                        </Button>
                      </div>
                    </div>
                  )}

                  {personBLocked && (
                    <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                      <p className="text-sm text-amber-800">{personBStatement}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/session/phase2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!personALocked || !personBLocked}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Continue to Phase 4
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
