import { useEffect } from 'react'
import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

function App() {
  // Remove no-touch class if it exists (added by some build tools or libraries)
  useEffect(() => {
    if (document.documentElement.classList.contains('no-touch')) {
      document.documentElement.classList.remove('no-touch')
    }
    
    // Also watch for any future additions of this class
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('no-touch')) {
        document.documentElement.classList.remove('no-touch')
      }
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Pages />
      <Toaster />
      <Analytics />
    </>
  )
}

export default App 