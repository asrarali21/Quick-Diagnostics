import axios from 'axios'
import React, { useState, useEffect } from 'react'


function Chatbot() {
  // Basic state only (no refs)
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [input, setInput] = useState("")
  const [firstName , setFirstName] = useState()
  // store messages as objects: {role:'user'|'bot', content:string}
  const [chatHistory , setChatHistory] = useState([])
  const [loadingReply, setLoadingReply] = useState(false)

  useEffect(()=>{
   const fetchDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me`, {withCredentials:true})
      console.log("first name",response);
   setFirstName(response?.data?.data?.firstName)
      
    } catch (error) {
      console.log(error);
    }
   }
  fetchDetails()
  }, [])

  // Simple predefined suggestion buttons
  const suggestions = [
    'What Tests are Availiable?',
    'What are the prices of Tests?',
    'Report turnaround time',
    'Test preparation help',
  ]

  // When chat opens we can scroll to bottom using window (optional simple approach)
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        // Scroll the page slightly so mobile keyboards do not hide the panel (optional)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    }
  }, [open])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!input.trim() || loadingReply) return
    const userText = input.trim()
    setChatHistory(h => [...h, { role:'user', content: userText }])
    setInput('')
    setLoadingReply(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/rag/ask` , {question:userText} , {withCredentials:true})
      console.log(response);  
         const payload = response?.data?.data
         console.log(payload);
         
    const botText = typeof payload === 'string'
      ? payload
      : (payload?.answer ?? 'Okay.')
      setChatHistory(h => [...h, { role:'bot', content: botText }])
    } catch (error) {
      console.log("error while sending" , error)
      setChatHistory(h => [...h, { role:'bot', content: "Sorry, something went wrong." }])
    } finally {
      setLoadingReply(false)
    }
  }

  const handleSuggestion = (text) => { setInput(text) }

  return (
    <>
      {/* Launcher Button */}
      {!open && (
        <button
          aria-label="Open chat"
            onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#4D1C8C] via-[#6B4DF8] to-[#4D1C8C] shadow-[0_8px_24px_-6px_rgba(98,52,246,0.55)] ring-4 ring-transparent hover:ring-[#7C5CFC]/25 transition-all duration-300">
            <svg width="30" height="30" viewBox="0 0 24 24" className="text-white drop-shadow">
              <path fill="currentColor" d="M12 3c-3.9 0-7 2.7-7 6 0 1.3.5 2.5 1.5 3.5-.1 1.1-.6 2.5-1.9 3.7 1.6-.2 3-.7 4-1.3a8.6 8.6 0 0 0 3.4.7c3.9 0 7-2.7 7-6s-3.1-6-7-6Z"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF4D4F] text-white text-xs font-semibold flex items-center justify-center shadow">1</span>
          </span>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-[420px] h-[80vh] sm:h-[560px] max-h-[100vh] z-50 flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col flex-1 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_12px_48px_-12px_rgba(40,20,90,0.35)] bg-white/85 backdrop-blur-xl border border-white/60">
          {/* Header */}
          <div className="flex items-start gap-3 px-5 pt-4 pb-3 border-b border-[#E9E6F5] bg-white/70 backdrop-blur">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#2D2A38]">AI Assistant</h3>
              <p className="text-xs text-[#6A6675]">We’re here to help</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCollapsed(c => !c)}
                aria-label={collapsed ? 'Expand chat' : 'Collapse chat'}
                className="p-2 rounded-lg hover:bg-[#F2EEF9] text-[#5B33D6]"
              >
                {collapsed ? (
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 14h10v2H7zM7 8h10v2H7z"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6V5h2z"/></svg>
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-2 rounded-lg hover:bg-[#F2EEF9] text-[#5B33D6]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.586 4.95-4.95 1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12l-4.95-4.95L7.05 5.636z"/></svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 flex flex-col min-h-0 ${collapsed ? 'hidden' : ''}`}> 
            <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 space-y-5 bg-gradient-to-b from-white/90 via-white/70 to-white/60">
            
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#4D1C8C] flex items-center justify-center text-[11px] text-white font-semibold">AI</div>
                <div className="max-w-[78%] rounded-2xl bg-[#F2EEF9] text-[#2D2A38] px-4 py-3 text-sm leading-relaxed ring-1 ring-[#E2DAF7]">
                  <span className="mr-1">👋</span>Hi {firstName || 'there'}! What brings you here today?
                </div>
              </div>
              {/* Suggestions (only show if no user messages yet) */}
              {chatHistory.filter(m=>m.role==='user').length === 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {suggestions.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSuggestion(s)}
                      className="px-5 py-2.5 rounded-full text-[13px] font-medium bg-white/80 backdrop-blur border border-[#E5E1F3] text-[#4D1C8C] hover:text-white hover:bg-gradient-to-r hover:from-[#7C5CFC] hover:to-[#4D1C8C] shadow-sm hover:shadow-md transition-all"
                    >{s}</button>
                  ))}
                </div>
              )}
              {/* Chat History */}
              <div className="space-y-4">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] text-sm leading-relaxed rounded-2xl px-4 py-2 shadow-sm ring-1
                        ${msg.role === 'user' ? 'bg-gradient-to-br from-[#7C5CFC] to-[#4D1C8C] text-white ring-transparent' : 'bg-[#F5F2FA] text-[#2D2A38] ring-[#E2DAF7]'}`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loadingReply && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 bg-[#F5F2FA] ring-1 ring-[#E2DAF7] rounded-2xl px-4 py-2 text-sm text-[#2D2A38]">
                      <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-pulse delay-150"></span>
                      <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-pulse delay-300"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Input */}
            <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#E9E6F5] bg-white/90 backdrop-blur px-4 py-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}>
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onInput={(e) => { e.target.style.height = 'auto'; const h = Math.min(e.target.scrollHeight, 160); e.target.style.height = h + 'px' }}
                    placeholder="Type a message..."
                    className="resize-none overflow-hidden w-full text-sm leading-5 max-h-40 px-3 py-2 pr-10 rounded-xl border border-[#D9D3EC] bg-white/80 placeholder:text-[#9B96A8] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/50 focus:border-[#7C5CFC]"
                    style={{ lineHeight: '1.25rem' }}
                  />
                  <div className="absolute right-2 bottom-1.5 text-[10px] text-[#9B96A8]">{input.length > 0 && input.length}</div>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loadingReply}
                  className="h-11 px-5 rounded-xl font-medium text-sm bg-gradient-to-br from-[#7C5CFC] to-[#4D1C8C] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:scale-[0.97] transition-all"
                >
                  {loadingReply ? 'Thinking...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
          {collapsed && (<div className="px-4 py-2 text-xs text-[#6A6675] bg-white/70 border-t border-[#E9E6F5]">Chat collapsed</div>)}
        </div>
      </div>
    </>
  )
}

export default Chatbot
