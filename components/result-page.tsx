"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface AnalysisResult {
  style: string
  tone: string
  readability: string
  suggestions: string[]
}

export function ResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data))
        setResult(parsedData.analysisResult)
      } catch (error) {
        console.error('Error parsing result data:', error)
      }
    }
  }, [searchParams])

  if (!result) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Your Writing Analysis</h1>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overall Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Style', value: result.style },
                { title: 'Tone', value: result.tone },
                { title: 'Readability', value: result.readability },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white/5 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p>{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Suggestions for Improvement</h2>
            <ul className="space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>{suggestion}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/" className="inline-flex items-center text-purple-300 hover:text-purple-100">
              <ArrowLeft className="mr-2" />
              Return to the magical realm
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
