import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { UserDataApistate } from '../store/userstate'
import { authModalOpenState, authModalTabState } from '../store/authModal.state'

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [loadingReply, setLoadingReply] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Get user info from Recoil state
  const userInfo = useRecoilValue(UserDataApistate)
  const setAuthModalOpen = useSetRecoilState(authModalOpenState)
  const setAuthModalTab = useSetRecoilState(authModalTabState)

  // Check if user is logged in
  const isLoggedIn = userInfo && userInfo.email

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, loadingReply])

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current && isLoggedIn) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, isLoggedIn])

  const suggestions = [
    { icon: '🧪', text: 'Available Tests' },
    { icon: '💰', text: 'Test Prices' },
    { icon: '✨', text: 'Test Benefits' },
    { icon: '📋', text: 'Pre-test Guide' },
  ]

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false)
  }

  const handleOpenAuthModal = (tab = 'login') => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
    setOpen(false) // Close chatbot when opening auth modal
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loadingReply) return
    const userText = input.trim()
    setChatHistory(h => [...h, { role: 'user', content: userText, timestamp: new Date() }])
    setInput('')
    setLoadingReply(true)
    setIsTyping(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/rag/ask`, { question: userText }, { withCredentials: true })
      const payload = response?.data?.data
      const botText = typeof payload === 'string' ? payload : (payload?.answer ?? 'I apologize, but I could not process that request.')

      // Simulate typing delay for more natural feel
      setTimeout(() => {
        setChatHistory(h => [...h, { role: 'bot', content: botText, timestamp: new Date() }])
        setIsTyping(false)
      }, 500)
    } catch (error) {
      console.log("error while sending", error)
      setChatHistory(h => [...h, { role: 'bot', content: "I'm sorry, I'm having trouble connecting right now. Please try again.", timestamp: new Date() }])
      setIsTyping(false)
    } finally {
      setLoadingReply(false)
    }
  }

  const handleSuggestion = (text) => {
    setInput(text)
    inputRef.current?.focus()
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          aria-label="Open chat assistant"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full bg-[#647FBC] animate-ping opacity-25"></span>

          {/* Main button */}
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#647FBC] shadow-lg shadow-[#647FBC]/30 hover:shadow-xl hover:shadow-[#647FBC]/40 hover:scale-110 transition-all duration-300">
            <svg width="26" height="26" viewBox="0 0 24 24" className="text-white">
              <path fill="currentColor" d="M12 3c-4.97 0-9 3.13-9 7 0 2.38 1.43 4.5 3.65 5.74-.32 1.2-.98 2.48-2.15 3.76.5.1 1.05.15 1.62.15 1.88 0 3.56-.53 4.88-1.4.64.1 1.31.15 2 .15 4.97 0 9-3.13 9-7s-4.03-7-9-7z" />
            </svg>

            {/* Notification badge */}
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              1
            </span>
          </span>

          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need help? Chat with us!
          </span>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-[85vh] sm:h-[600px] max-h-[100vh] z-50 transition-all duration-300 ease-out ${open ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat assistant"
      >
        <div className="flex flex-col h-full rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">

          {/* Header - Gradient with status */}
          <div className="relative bg-[#647FBC] px-5 py-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                    <circle cx="10" cy="10" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect fill="url(#dots)" width="100" height="100" />
              </svg>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Bot Avatar */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" className="text-white">
                      <path fill="currentColor" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5z" />
                    </svg>
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#647FBC]"></span>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base">Quick Assistant</h3>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online • Typically replies instantly
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-white">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content Area - Changes based on login status */}
          {isLoggedIn ? (
            /* ========== LOGGED IN - CHAT VIEW ========== */
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto bg-gray-50">
                <div className="px-4 py-4 space-y-4">

                  {/* Welcome Message */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#647FBC] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                        <path fill="currentColor" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100">
                        <p className="text-gray-800 text-sm leading-relaxed">
                          👋 Hi {userInfo?.firstName || 'there'}! I'm your Quick Diagnostics assistant. How can I help you today?
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-400 ml-1">Just now</span>
                    </div>
                  </div>

                  {/* Quick Suggestions */}
                  {chatHistory.filter(m => m.role === 'user').length === 0 && (
                    <div className="pl-10">
                      <p className="text-xs text-gray-500 mb-2 font-medium">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSuggestion(s.text)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:border-[#647FBC] hover:text-[#647FBC] hover:bg-[#647FBC]/5 shadow-sm transition-all duration-200"
                          >
                            <span>{s.icon}</span>
                            {s.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat Messages */}
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2.5'}`}>
                      {msg.role === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-[#647FBC] flex items-center justify-center flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                            <path fill="currentColor" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                          </svg>
                        </div>
                      )}
                      <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : ''} max-w-[80%]`}>
                        <div
                          className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                            ? 'bg-[#647FBC] text-white rounded-2xl rounded-tr-md'
                            : 'bg-white text-gray-800 rounded-2xl rounded-tl-md border border-gray-100'
                            }`}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-gray-400 mx-1">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#647FBC] flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                          <path fill="currentColor" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                        </svg>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-end gap-3">
                  {/* Text Input */}
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSubmit(e)
                        }
                      }}
                      onInput={(e) => {
                        e.target.style.height = 'auto'
                        const h = Math.min(e.target.scrollHeight, 120)
                        e.target.style.height = h + 'px'
                      }}
                      placeholder="Type your message..."
                      className="w-full resize-none overflow-hidden text-sm leading-5 max-h-[120px] px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#647FBC]/30 focus:border-[#647FBC] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!input.trim() || loadingReply}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#647FBC] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5570a8] active:scale-95 transition-all shadow-sm"
                  >
                    {loadingReply ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" className="rotate-45">
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Footer hint */}
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  Press Enter to send • Shift + Enter for new line
                </p>
              </form>
            </>
          ) : (
            /* ========== NOT LOGGED IN - LOGIN PROMPT ========== */
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 bg-gray-50">
              {/* Lock Icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#647FBC]/20 to-[#647FBC]/10 flex items-center justify-center mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" className="text-[#647FBC]">
                  <path fill="currentColor" d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
              </div>

              {/* Message */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Sign in to Chat
              </h3>
              <p className="text-gray-500 text-sm text-center mb-8 max-w-[280px]">
                Please sign in to access our AI-powered assistant and get personalized help with your diagnostic needs.
              </p>

              {/* Benefits */}
              <div className="w-full max-w-[280px] space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Ask about available tests
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Get pricing information
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Pre-test preparation guide
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={() => handleOpenAuthModal('login')}
                className="w-full max-w-[280px] py-3 px-4 bg-[#647FBC] text-white font-medium rounded-xl hover:bg-[#5570a8] transition-all shadow-md hover:shadow-lg"
              >
                Sign In to Continue
              </button>

              {/* Create Account Link */}
              <p className="mt-4 text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  onClick={() => handleOpenAuthModal('register')}
                  className="text-[#647FBC] font-medium hover:underline"
                >
                  Create one
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Chatbot
