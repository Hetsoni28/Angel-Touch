/**
 * Renders a heading string with its last word in the brand's italic accent —
 * "Learn how it's *made*." — for titles that arrive as plain text (props, data).
 * Trailing punctuation stays upright: "Membership opens *soon*."
 */
export function AccentTitle({ text, className = 'accent-italic' }: { text: string; className?: string }) {
  const trimmed = text.trim()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace < 0) return <>{trimmed}</>
  const head = trimmed.slice(0, lastSpace + 1)
  const tail = trimmed.slice(lastSpace + 1)
  const match = tail.match(/^(.*?)([.,!?:;]*)$/)
  const word = match?.[1] ?? tail
  const punct = match?.[2] ?? ''
  return (
    <>
      {head}
      <span className={className}>{word}</span>
      {punct}
    </>
  )
}
