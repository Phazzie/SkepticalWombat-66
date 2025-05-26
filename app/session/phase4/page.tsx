"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProgressTracker } from "@/components/progress-tracker"
import { WombatAvatar } from "@/components/wombat-avatar"

type Message = {
  id: string
  sender: "A" | "B" | "wombat"
  text: string
  timestamp: Date
}

export default function Phase4Page() {
  // In a real app, we would load data from previous phases
  const agreedIssue = "We disagree about how to manage our finances and spending habits."

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "wombat",
      text: "Now you can actually talk to each other. I'll be watching and calling out any BS I see. Try to be constructive, or don't. I'm a wombat, not a cop.",
      timestamp: new Date(),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [currentPerson, setCurrentPerson] = useState<"A" | "B">("A")
  const [showResolutionButton, setShowResolutionButton] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: currentPerson,
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Switch to the other person
    setCurrentPerson(currentPerson === "A" ? "B" : "A")

    // After a few messages, show the resolution button
    if (messages.length >= 5 && !showResolutionButton) {
      setShowResolutionButton(true)

      // Add a wombat message calling out a pattern
      setTimeout(() => {
        const wombatMessage: Message = {
          id: Date.now().toString(),
          sender: "wombat",
          text: "I notice you keep talking about the past instead of focusing on solutions. Classic deflection move. Maybe try discussing what you actually want to happen going forward?",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, wombatMessage])
      }, 1000)
    }
  }

  const handleProposeResolution = () => {
    window.location.href = "/session/phase5"
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
          <ProgressTracker currentPhase={4} />
        </div>
      </header>
      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-2xl">
          <Card className="flex h-[600px] flex-col">
            <CardHeader>
              <CardTitle>Phase 4: Structured Discussion</CardTitle>
              <CardDescription>Now you can actually argue, but with a referee who calls out the BS.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="mb-4 rounded-md bg-indigo-50 p-3">
                <div className="mb-1 text-sm font-medium text-indigo-800">Agreed Issue</div>
                <p className="text-sm text-indigo-700">{agreedIssue}</p>
              </div>

              <div className="flex h-[calc(100%-3.5rem)] flex-col gap-4 overflow-y-auto pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "wombat" ? "justify-center" : message.sender === currentPerson ? "justify-start" : "justify-end"}`}
                  >
                    {message.sender === "wombat" ? (
                      <div className="max-w-[80%] rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                        <div className="mb-1 flex items-center gap-2">
                          <WombatAvatar outfit="hip-hop" size="xs" />
                          <span className="font-medium">Skeptical Wombat</span>
                        </div>
                        {message.text}
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] rounded-lg p-3 text-sm ${message.sender === "A" ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-800"}`}
                      >
                        <div className="mb-1 font-medium">Person {message.sender}</div>
                        {message.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-white">
              <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                <div className="rounded-md bg-amber-50 px-3 py-1 text-xs text-amber-800">Person {currentPerson}</div>
                <Input
                  placeholder={`Type your message as Person ${currentPerson}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>

                {showResolutionButton && (
                  <Button onClick={handleProposeResolution} className="bg-indigo-600 hover:bg-indigo-700">
                    Propose Resolution
                  </Button>
                )}
              </form>
            </CardFooter>
          </Card>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/session/phase3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
