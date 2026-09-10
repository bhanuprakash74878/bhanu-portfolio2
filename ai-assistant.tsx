"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef, useState } from "react"
import { Sparkles, X, Send, Bot } from "lucide-react"
import { content } from "@/lib/content"
import { ASK_BHANU_EVENT } from "@/lib/ask-bhanu"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  "Who is Bhanu?",
  "What is he studying?",
  "What are his career goals?",
  "Does he have internship experience?",
  "How can I contact him?",
]

export function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const busy = status === "submitted" || status === "streaming"

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(ASK_BHANU_EVENT, onOpen as EventListener)
    return () => window.removeEventListener(ASK_BHANU_EVENT, onOpen as EventListener)
  }, [])

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open, busy])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const submit = (text: string) => {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput("")
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-brand/25 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "scale-90 opacity-0 pointer-events-none",
        )}
      >
        <Sparkles className="size-4" />
        Ask Bhanu
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-x-3 bottom-3 z-[80] flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 sm:inset-x-auto sm:right-5 sm:w-[400px]",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
        role="dialog"
        aria-modal="false"
        aria-label="Ask Bhanu AI assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="relative flex size-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <Bot className="size-5" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-green-500" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Bhanu AI</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Portfolio assistant
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Sparkles className="size-6" />
              </span>
              <p className="text-sm font-medium">Hi! I&apos;m Bhanu&apos;s AI assistant.</p>
              <p className="max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
                Ask me anything about {content.profile.name.split(" ")[0]}&apos;s education,
                goals, or how to get in touch. I only share verified information.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-brand text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-background",
                  )}
                >
                  {m.parts.map((part, i) =>
                    part.type === "text" ? <span key={i}>{part.text}</span> : null,
                  )}
                </div>
              </div>
            ))
          )}

          {status === "submitted" ? (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-background px-3.5 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              Something went wrong. Please try again in a moment.
            </p>
          ) : null}
        </div>

        {/* Suggestions */}
        {messages.length === 0 ? (
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => submit(q)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
              >
                {q}
              </button>
            ))}
          </div>
        ) : null}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                submit(input)
              }
            }}
            placeholder="Ask about Bhanu..."
            aria-label="Message"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="size-[18px]" />
          </button>
        </form>
      </div>
    </>
  )
}
