export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>🎵 Guru-Dhrupad</h1>
      <p>Welcome to the Dhrupad Master App</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>About</h2>
        <p>
          Guru-Dhrupad is an AI-powered application designed to help you explore
          and master the ancient Indian classical music form of Dhrupad.
        </p>
        <p>
          This app leverages the OpenRouter API to provide intelligent assistance
          for learning and understanding Dhrupad music.
        </p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Getting Started</h2>
        <ul>
          <li>Ensure you have configured your OpenRouter API key in .env.local</li>
          <li>Run the development server with: npm run dev</li>
          <li>Open http://localhost:3000 to see the app</li>
        </ul>
      </div>
    </main>
  )
}
