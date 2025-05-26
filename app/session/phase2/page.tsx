"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ProgressTracker } from "@/components/progress-tracker"
import { Textarea } from "@/components/ui/textarea"
import { WombatAvatar } from "@/components/wombat-avatar"
import { WombatSpeechBubble } from "@/components/wombat-speech-bubble"

export default function Phase2Page() {
  // In a real app, we would load the agreed issue from the previous phase
  const agreedIssue = "We disagree about how to manage our finances and spending habits."

  const [personAExplanation, setPersonAExplanation] = useState("")
  const [personBExplanation, setPersonBExplanation] = useState("")
  const [personAApproved, setPersonAApproved] = useState(false)
  const [personBApproved, setPersonBApproved] = useState(false)
  const [currentPerson, setCurrentPerson] = useState<"A" | "B">("A")

  const handleContinue = () => {
    window.location.href = "/session/phase3"
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
          <ProgressTracker currentPhase={2} />
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Steel-Manning</CardTitle>
              <CardDescription>
                Before you can complain about your side, you have to prove you actually understand their side.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <WombatSpeechBubble position="right">
                  {!personAApproved &&
                    !personBApproved &&
                    "Now prove you're actually listening to each other. Novel concept, I know."}
                  {personAApproved && !personBApproved && "Person A gets it. Your turn, Person B."}
                  {!personAApproved && personBApproved && "Person B gets it. Your turn, Person A."}
                  {personAApproved &&
                    personBApproved &&
                    "Well, would you look at that? You both actually understand each other. Miracles do happen."}
                </WombatSpeechBubble>
                <div className="flex justify-end">
                  <WombatAvatar outfit="hip-hop" size="md" />
                </div>
              </div>

              <div className="rounded-md bg-indigo-50 p-4">
                <div className="mb-2 text-sm font-medium text-indigo-800">Agreed Issue</div>
                <p className="text-indigo-700">{agreedIssue}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Person A's Perspective</h3>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${personBApproved ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}
                    >
                      {personBApproved ? "✓" : "?"}
                    </div>
                  </div>

                  {currentPerson === "B" && !personBApproved && (
                    <div className="space-y-2">
                      <Label htmlFor="personAExplanation">Explain Person A's perspective</Label>
                      <Textarea
                        id="personAExplanation"
                        placeholder="How does Person A see this issue?"
                        className="min-h-[150px]"
                        value={personAExplanation}
                        onChange={(e) => setPersonAExplanation(e.target.value)}
                      />
                      <p className="text-xs text-slate-500">Person A will need to confirm this is accurate.</p>
                    </div>
                  )}

                  {personAExplanation && currentPerson === "A" && !personBApproved && (
                    <div className="space-y-2">
                      <Label>Is this how you see the issue?</Label>
                      <div className="rounded-md border border-slate-200 bg-white p-3">{personAExplanation}</div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPersonAExplanation("")
                            setCurrentPerson("B")
                          }}
                        >
                          No, try again
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setPersonBApproved(true)
                            setCurrentPerson("A")
                          }}
                        >
                          Yes, that's right
                        </Button>
                      </div>
                    </div>
                  )}

                  {personBApproved && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-3">
                      <p className="text-sm text-green-800">{personAExplanation}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Person B's Perspective</h3>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${personAApproved ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}`}
                    >
                      {personAApproved ? "✓" : "?"}
                    </div>
                  </div>

                  {currentPerson === "A" && !personAApproved && (
                    <div className="space-y-2">
                      <Label htmlFor="personBExplanation">Explain Person B's perspective</Label>
                      <Textarea
                        id="personBExplanation"
                        placeholder="How does Person B see this issue?"
                        className="min-h-[150px]"
                        value={personBExplanation}
                        onChange={(e) => setPersonBExplanation(e.target.value)}
                      />
                      <p className="text-xs text-slate-500">Person B will need to confirm this is accurate.</p>
                    </div>
                  )}

                  {personBExplanation && currentPerson === "B" && !personAApproved && (
                    <div className="space-y-2">
                      <Label>Is this how you see the issue?</Label>
                      <div className="rounded-md border border-slate-200 bg-white p-3">{personBExplanation}</div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPersonBExplanation("")
                            setCurrentPerson("A")
                          }}
                        >
                          No, try again
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setPersonAApproved(true)
                            setCurrentPerson("B")
                          }}
                        >
                          Yes, that's right
                        </Button>
                      </div>
                    </div>
                  )}

                  {personAApproved && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-3">
                      <p className="text-sm text-green-800">{personBExplanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/session/phase1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!personAApproved || !personBApproved}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Continue to Phase 3
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
