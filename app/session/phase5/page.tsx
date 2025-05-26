"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ProgressTracker } from "@/components/progress-tracker"
import { Textarea } from "@/components/ui/textarea"
import { WombatAvatar } from "@/components/wombat-avatar"
import { WombatSpeechBubble } from "@/components/wombat-speech-bubble"

export default function Phase5Page() {
  // In a real app, we would load data from previous phases
  const agreedIssue = "We disagree about how to manage our finances and spending habits."

  const [resolution, setResolution] = useState("")
  const [status, setStatus] = useState<"draft" | "proposed" | "accepted" | "rejected" | "modified">("draft")
  const [modifiedResolution, setModifiedResolution] = useState("")
  const [currentPerson, setCurrentPerson] = useState<"A" | "B">("A")
  const [completed, setCompleted] = useState(false)

  const handleProposeResolution = () => {
    setStatus("proposed")
    setCurrentPerson("B")
  }

  const handleAccept = () => {
    setStatus("accepted")
    setCompleted(true)
  }

  const handleReject = () => {
    setStatus("rejected")
    setCurrentPerson("A")
  }

  const handleModify = () => {
    setStatus("modified")
    setCurrentPerson("A")
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
          <ProgressTracker currentPhase={5} />
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Phase 5: Resolution Agreement</CardTitle>
              <CardDescription>Time to actually solve this instead of just fighting forever.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <WombatSpeechBubble position="right">
                  {status === "draft" &&
                    "Final step. Let's see if you can actually solve something instead of just complaining about it."}
                  {status === "proposed" &&
                    "Does this solution work for you? Be honest. A bad agreement is worse than no agreement."}
                  {status === "rejected" &&
                    "Back to the drawing board. At least you're not settling for a bad solution."}
                  {status === "modified" && "Person A, your partner has a different idea. Shocking, I know."}
                  {status === "accepted" &&
                    "Look at that, you actually solved something. I'm genuinely impressed. Maybe there's hope for you two after all."}
                </WombatSpeechBubble>
                <div className="flex justify-end">
                  <WombatAvatar outfit="streetwear" size="md" />
                </div>
              </div>

              <div className="rounded-md bg-indigo-50 p-4">
                <div className="mb-2 text-sm font-medium text-indigo-800">Agreed Issue</div>
                <p className="text-indigo-700">{agreedIssue}</p>
              </div>

              <div className="rounded-md bg-slate-100 p-4">
                <div className="mb-2 text-sm font-medium text-slate-500">Current Status</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${status === "accepted" ? "bg-green-500" : "bg-amber-500"}`}
                  ></div>
                  <span className="font-medium">
                    {status === "draft" && "Waiting for Person A to propose a resolution"}
                    {status === "proposed" && "Waiting for Person B to respond"}
                    {status === "rejected" && "Person B rejected the resolution"}
                    {status === "modified" && "Person B modified the resolution"}
                    {status === "accepted" && "Resolution agreed upon!"}
                  </span>
                </div>
              </div>

              {(status === "draft" || status === "rejected") && currentPerson === "A" && (
                <div className="space-y-2">
                  <Label htmlFor="resolution">Propose a resolution</Label>
                  <Textarea
                    id="resolution"
                    placeholder="What's your proposed solution to this issue?"
                    className="min-h-[120px]"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                  />
                  <p className="text-xs text-slate-500">Be specific about what actions each person will take.</p>
                </div>
              )}

              {status === "proposed" && currentPerson === "B" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Proposed Resolution</Label>
                    <div className="rounded-md border border-slate-200 bg-white p-3">{resolution}</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modifiedResolution">Modify the resolution (optional)</Label>
                    <Textarea
                      id="modifiedResolution"
                      placeholder="Suggest changes to the proposed resolution..."
                      className="min-h-[120px]"
                      value={modifiedResolution}
                      onChange={(e) => setModifiedResolution(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {status === "modified" && currentPerson === "A" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Original Resolution</Label>
                    <div className="rounded-md border border-slate-200 bg-white p-3">{resolution}</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Their Modified Version</Label>
                    <div className="rounded-md border border-slate-200 bg-white p-3">{modifiedResolution}</div>
                  </div>

                  <div className="rounded-md bg-amber-50 p-4 text-amber-800">
                    <p className="text-sm">Do you accept their modified version of the resolution?</p>
                  </div>
                </div>
              )}

              {status === "accepted" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Agreed Resolution</Label>
                    <div className="rounded-md border border-green-200 bg-green-50 p-3 text-green-800">
                      {modifiedResolution || resolution}
                    </div>
                  </div>

                  <div className="rounded-md bg-indigo-50 p-4">
                    <h3 className="mb-2 text-sm font-medium text-indigo-800">Session Summary</h3>
                    <div className="space-y-2 text-sm text-indigo-700">
                      <p>
                        <strong>Issue:</strong> {agreedIssue}
                      </p>
                      <p>
                        <strong>Resolution:</strong> {modifiedResolution || resolution}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Export Summary</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/session/phase4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>

              {status === "draft" && (
                <Button
                  onClick={handleProposeResolution}
                  disabled={!resolution.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Propose Resolution
                </Button>
              )}

              {status === "proposed" && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleReject}>
                    Reject
                  </Button>
                  <Button variant="outline" onClick={handleModify} disabled={!modifiedResolution.trim()}>
                    Modify
                  </Button>
                  <Button onClick={handleAccept} className="bg-indigo-600 hover:bg-indigo-700">
                    Accept
                  </Button>
                </div>
              )}

              {status === "modified" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatus("draft")
                      setModifiedResolution("")
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setResolution(modifiedResolution)
                      setStatus("accepted")
                      setCompleted(true)
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Accept Changes
                  </Button>
                </div>
              )}

              {completed && (
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/">
                    <Check className="mr-2 h-4 w-4" />
                    Complete Session
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
