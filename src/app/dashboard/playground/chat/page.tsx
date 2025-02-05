"use client"

import { useChat } from "ai/react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat",
  })
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    try {
      await handleSubmit(e)
    } catch (error) {
      console.error("Error submitting message:", error)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-muted/50">
      {/* Header */}
      <header className="shadow-sm bg-background">
        <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-primary">AI Chat</h1>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground max-w-[70%] rounded-lg p-3">AI is typing...</div>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred while processing your request. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <div className="p-4 bg-background border-t">
        <form onSubmit={onSubmit} className="flex space-x-4 max-w-4xl mx-auto">
          <Input value={input} onChange={handleInputChange} placeholder="Type your message..." className="flex-grow" />
          <Button type="submit" disabled={isTyping}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

