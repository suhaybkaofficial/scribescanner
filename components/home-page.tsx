"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export function HomePage() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!text.trim()) {
        throw new Error('No text to analyze')
      }

      const analysisResponse = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!analysisResponse.ok) throw new Error('Analysis failed')

      const analysisResult = await analysisResponse.json()

      // Redirect to the result page with the analysis result
      router.push(`/result?data=${encodeURIComponent(JSON.stringify(analysisResult))}`)
    } catch (error) {
      console.error('Error during analysis:', error)
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Writing Style Wizard
        </motion.h1>
        <motion.div 
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="text-input" className="block text-lg font-medium mb-2">
                Enchant us with your words:
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={handleTextChange}
                placeholder="Let your creativity flow..."
                className="w-full min-h-[200px] bg-white/5 border-2 border-purple-300/30 rounded-lg p-4 text-white placeholder-purple-200/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300"
              />
            </div>
            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isLoading || !text.trim()}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold 
                  bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700
                  rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                  ${isLoading || !text.trim() ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Casting Spell...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Analyze Text
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
