import type { ReactNode } from "react"

interface WombatSpeechBubbleProps {
  children: ReactNode
  position?: "left" | "right"
}

export function WombatSpeechBubble({ children, position = "left" }: WombatSpeechBubbleProps) {
  return (
    <div
      className={`relative mb-4 max-w-[80%] rounded-lg bg-slate-700 p-3 text-sm text-white ${
        position === "left" ? "mr-auto" : "ml-auto"
      }`}
    >
      <div
        className={`absolute bottom-[-6px] h-3 w-3 rotate-45 bg-slate-700 ${
          position === "left" ? "left-3" : "right-3"
        }`}
      ></div>
      {children}
    </div>
  )
}
