"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Edit3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ProgressTracker } from "@/components/progress-tracker"
import { Textarea } from "@/components/ui/textarea"

export default function Phase1Page() {
  const [issue, setIssue] = useState("")
  const [status, setStatus] = useState<"draft" | "proposed" | "accepted" | "rejected" | "modified">("draft")
  const [modifiedIssue, setModifiedIssue] = useState("")
  const [currentPerson, setCurrentPerson] = useState<"A" | "B">("A")

  const handleProposeIssue = () => {
    setStatus("proposed")
    setCurrentPerson("B")
  }

  const handleAccept = () => {
    setStatus("accepted")
  }

  const handleReject = () => {
    setStatus("rejected")
    setCurrentPerson("A")
  }

  const handleModify = () => {
    setStatus("modified")
    setCurrentPerson("A")
  }

  const handleContinue = () => {
    window.location.href = "/session/phase2"
  }

  const getWombatComment = () => {
    switch (status) {
      case "draft":
        return "Let's start with the revolutionary concept of agreeing on what you're actually fighting about. I know, I know, it's wild."
      case "proposed":
        return "Person B, do you actually agree this is the issue? Or are we about to watch you completely change the subject?"
      case "rejected":
        return "Rejected! Well, at least you're being honest about not agreeing. Back to the drawing board, folks."
      case "modified":
        return "Oh look, Person B has *opinions* about how to phrase this. Shocking development. Person A, what's your take?"
      case "accepted":
        return "Holy wombat, you actually agreed on something! Mark your calendars, this is a historic moment."
      default:
        return ""
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
              <p className="text-xs text-slate-500">Phase 1: Issue Agreement</p>
            </div>
          </Link>
          <ProgressTracker currentPhase={1} />
        </div>
      </header>

      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-2xl">
          <Card className="border-orange-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
                  1
                </div>
                Issue Agreement
              </CardTitle>
              <CardDescription className="text-slate-600">
                Before you can fight about something, you both have to agree on what you&apos;re actually fighting
                about.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-lg bg-orange-50 p-4">
                <div className="flex items-start gap-3">
                  <img
                    src="/images/wombat-casual.png"
                    alt="Skeptical Wombat"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-slate-700">{getWombatComment()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-orange-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-slate-700">Current Status</h3>
                  <div className="flex items-center gap-2">
                    {status === "accepted" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    )}
                    <span className="text-sm font-medium text-slate-600">
                      {status === "draft" && "Waiting for Person A to propose the issue"}
                      {status === "proposed" && "Waiting for Person B to respond"}
                      {status === "rejected" && "Person B rejected the issue"}
                      {status === "modified" && "Person B modified the issue"}
                      {status === "accepted" && "Issue agreed upon!"}
                    </span>
                  </div>
                </div>
              </div>

              {(status === "draft" || status === "rejected") && currentPerson === "A" && (
                <div className="space-y-3">
                  <Label htmlFor="issue" className="text-slate-700">
                    What&apos;s the actual problem here? (Be specific, not dramatic)
                  </Label>
                  <Textarea
                    id="issue"
                    placeholder="Example: 'We disagree about how to manage our monthly budget and spending priorities'"
                    className="min-h-[120px] border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                  />
                  <p className="text-xs text-slate-500">
                    This will be shared with your partner for agreement. Keep it factual, not accusatory.
                  </p>
                </div>
              )}

              {status === "proposed" && currentPerson === "B" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Proposed Issue</Label>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">{issue}</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modifiedIssue" className="text-slate-700">
                      Suggest changes (optional)
                    </Label>
                    <Textarea
                      id="modifiedIssue"
                      placeholder="If you want to modify the issue statement, write your version here..."
                      className="min-h-[100px] border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      value={modifiedIssue}
                      onChange={(e) => setModifiedIssue(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {status === "modified" && currentPerson === "A" && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-slate-700">Your Original Issue</Label>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">{issue}</div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700">Their Modified Version</Label>
                      <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-slate-700">
                        {modifiedIssue}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-amber-800">Do you accept their modified version of the issue?</p>
                  </div>
                </div>
              )}

              {status === "accepted" && (
                <div className="space-y-3">
                  <Label className="text-slate-700">Agreed Issue</Label>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <p className="text-green-800 font-medium">{modifiedIssue || issue}</p>
                  </div>
                  <p className="text-xs text-slate-500">Both parties have agreed this is the issue to be resolved.</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Link href="/session/new">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>

              {status === "draft" && (
                <Button
                  onClick={handleProposeIssue}
                  disabled={!issue.trim()}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Propose This Issue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {status === "proposed" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Nope
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleModify}
                    disabled={!modifiedIssue.trim()}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Modify
                  </Button>
                  <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" />
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
                      setModifiedIssue("")
                    }}
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Changes
                  </Button>
                  <Button
                    onClick={() => {
                      setIssue(modifiedIssue)
                      setStatus("accepted")
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept Changes
                  </Button>
                </div>
              )}

              {status === "accepted" && (
                <Button onClick={handleContinue} className="bg-orange-600 hover:bg-orange-700 text-white">
                  Continue to Phase 2
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
