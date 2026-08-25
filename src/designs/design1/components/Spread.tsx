import type { ReactNode } from 'react'

/**
 * A book spread: verso (left page, hidden on small screens) and recto
 * (right page). The center rule is the binding gutter.
 */
export function Spread({ verso, recto }: { verso: ReactNode; recto: ReactNode }) {
  return (
    <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-2">
      <div className="hidden min-h-0 overflow-hidden border-r border-edge md:block">
        {verso}
      </div>
      <div className="min-h-0 overflow-hidden">{recto}</div>
    </div>
  )
}
