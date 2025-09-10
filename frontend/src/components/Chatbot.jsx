import React, { useState, useRef, useEffect } from 'react'

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const textareaRef = useRef(null)

  const suggestions = [
    'Track my order',
    'Pricing & discounts',
    'Report turnaround time',
    'Test preparation help',
    'Something else'
  ]

  // Scroll to bottom when opening
  useEffect(() => {
    if (open && scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      })
    }
  }, [open])

  // Auto-resize textarea for better input visibility
  useEffect(() => {
    if (!textareaRef.current) return
    const el = textareaRef.current
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [input])

  // Close only when clicking overlay background (not when dragging inside panel)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false)
  }

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full
            bg-gradient-to-br from-[#7C5CFC] via-[#6B4DF8] to-[#4D1C8C]
            shadow-[0_8px_24px_-6px_rgba(98,52,246,0.55)]
            ring-4 ring-transparent hover:ring-[#7C5CFC]/25
            transition-all duration-300">
            <svg width="30" height="30" viewBox="0 0 24 24" className="text-white drop-shadow">
              <path fill="currentColor" d="M12 3c-3.9 0-7 2.7-7 6 0 1.3.5 2.5 1.5 3.5-.1 1.1-.6 2.5-1.9 3.7 1.6-.2 3-.7 4-1.3a8.6 8.6 0 0 0 3.4.7c3.9 0 7-2.7 7-6s-3.1-6-7-6Z"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF4D4F] text-white text-xs font-semibold flex items-center justify-center shadow">
              1
            </span>
          </span>
        </button>
      )}

      {/* Dim overlay */}
      {open && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
        />
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-[420px] h-[80vh] sm:h-[560px] max-h-[100vh] z-50 flex flex-col will-change-transform transition-transform duration-300 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} `}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative flex flex-col flex-1 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_12px_48px_-12px_rgba(40,20,90,0.35)] bg-white/85 backdrop-blur-xl border border-white/60">
          {/* Header */}
          <div className="flex items-start gap-3 px-5 pt-4 pb-3 border-b border-[#E9E6F5] bg-white/70 backdrop-blur">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#4D1C8C] flex items-center justify-center shadow-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" className="text-white">
                <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v1.05A7.002 7.002 0 0 1 19 11v2.6l1.2 2.6A1 1 0 0 1 19.3 18H4.7a1 1 0 0 1-.9-1.4L5 13.6V11a7.002 7.002 0 0 1 6-6.95V3a1 1 0 0 1 1-1Zm0 7a3 3 0 0 0-3 3v1h6v-1a3 3 0 0 0-3-3Z"/>
              </svg>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#2D2A38] tracking-tight">AI Assistant</h3>
              <p className="text-xs text-[#6A6675]">We’re here to help</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCollapsed(c => !c)}
                aria-label={collapsed ? 'Expand chat' : 'Collapse chat'}
                className="p-2 rounded-lg hover:bg-[#F2EEF9] text-[#5B33D6] transition"
              >
                {collapsed ? (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 14h10v2H7zM7 8h10v2H7z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6V5h2z"/>
                  </svg>
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-2 rounded-lg hover:bg-[#F2EEF9] text-[#5B33D6] transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m12 10.586 4.95-4.95 1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12l-4.95-4.95L7.05 5.636z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Body (collapsible) */}
          <div className={`flex-1 flex flex-col min-h-0 transition-[opacity] duration-300 ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 pt-5 pb-4 space-y-5 scroll-smooth bg-gradient-to-b from-white/90 via-white/70 to-white/60"
            >
              {/* Greeting */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#4D1C8C] flex items-center justify-center text-[11px] text-white font-semibold shadow">
                  AI
                </div>
                <div className="group relative max-w-[78%]">
                  <div className="rounded-2xl bg-[#F2EEF9] text-[#2D2A38] px-4 py-3 text-sm leading-relaxed shadow-sm ring-1 ring-[#E2DAF7]">
                    <span className="mr-1">👋</span>
                    Hi there! What brings you here today?
                  </div>
                </div>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-3 pt-2">
                {suggestions.map(s => (
                  <button
                    key={s}
                    type="button"
                    className="px-5 py-2.5 rounded-full text-[13px] font-medium
                    bg-white/80 backdrop-blur border border-[#E5E1F3]
                    text-[#4D1C8C] hover:text-white
                    hover:bg-gradient-to-r hover:from-[#7C5CFC] hover:to-[#4D1C8C]
                    shadow-sm hover:shadow-md transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => { e.preventDefault() }}
              className="shrink-0 border-t border-[#E9E6F5] bg-white/90 backdrop-blur px-4 py-3"
            >
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="resize-none w-full text-sm leading-5 max-h-40 px-3 py-2 pr-10 rounded-xl border border-[#D9D3EC] bg-white/80 backdrop-blur placeholder:text-[#9B96A8] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/50 focus:border-[#7C5CFC] transition-shadow scrollbar-thin scrollbar-thumb-[#D2CAEFFF]"
                  />
                  <div className="absolute right-2 bottom-1.5 text-[10px] text-[#9B96A8]">
                    {input.length > 0 && input.length}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="h-11 px-5 rounded-xl font-medium text-sm bg-gradient-to-br from-[#7C5CFC] to-[#4D1C8C] text-white shadow disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:scale-[0.97] transition-all"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {collapsed && (
            <div className="px-4 py-2 text-xs text-[#6A6675] bg-white/70 border-t border-[#E9E6F5]">
              Chat collapsed
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Chatbot
