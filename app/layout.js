export const metadata = {
  title: 'Guru-Dhrupad',
  description: 'A Dhrupad master application powered by OpenRouter API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
