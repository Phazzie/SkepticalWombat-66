import Link from "next/link"
import { Check } from "lucide-react"

interface ProgressTrackerProps {
  currentPhase: number
}

export function ProgressTracker({ currentPhase }: ProgressTrackerProps) {
  const phases = [
    { id: 0, name: "Setup", short: "Setup" },
    { id: 1, name: "Issue Agreement", short: "Issue" },
    { id: 2, name: "Perspective Proof", short: "Proof" },
    { id: 3, name: "Statement Lock", short: "Lock" },
    { id: 4, name: "Supervised Chat", short: "Chat" },
    { id: 5, name: "Actual Solution", short: "Solution" },
  ]

  return (
    <div className="hidden md:flex items-center gap-1">
      {phases.map((phase, index) => (
        <div key={phase.id} className="flex items-center">
          {index > 0 && (
            <div className={`h-px w-4 ${currentPhase > phase.id - 1 ? "bg-orange-400" : "bg-slate-300"}`}></div>
          )}
          <Link
            href={phase.id === 0 ? "/session/new" : `/session/phase${phase.id}`}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
              currentPhase === phase.id
                ? "bg-orange-600 text-white shadow-lg"
                : currentPhase > phase.id
                  ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                  : "bg-slate-100 text-slate-400"
            }`}
            title={phase.name}
          >
            {currentPhase > phase.id ? <Check className="h-3 w-3" /> : phase.id}
          </Link>
        </div>
      ))}
    </div>
  )
}
