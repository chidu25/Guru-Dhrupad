'use client'

import { useState } from 'react'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      setResponse(data.answer)
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎵 Guru-Dhrupad</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Ask your Dhrupad Guru</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask Guru..."
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !question.trim()}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            backgroundColor: loading || !question.trim() ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {loading ? 'Asking Guru...' : 'Ask Guru'}
        </button>
      </form>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c00',
          marginBottom: '1rem',
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          lineHeight: '1.6',
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Guru's Response:</h3>
          <p style={{ margin: 0, color: '#555', whiteSpace: 'pre-wrap' }}>{response}</p>
        </div>
      )}
    </main>
  )
}
