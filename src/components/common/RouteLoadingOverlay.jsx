import { useEffect, useRef, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import LoadingOverlay from './LoadingOverlay'

const MIN_VISIBLE_MS = 500

function RouteLoadingOverlay({ onVisibilityChange }) {
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false)
  const shownAtRef = useRef(0)

  const isBusy = navigation.state !== 'idle'

  useEffect(() => {
    if (isBusy) {
      if (!isVisible) {
        shownAtRef.current = Date.now()
        setIsVisible(true)
      }
      return
    }

    if (!isVisible) {
      return
    }

    const elapsed = Date.now() - shownAtRef.current
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
    const timeoutId = window.setTimeout(() => setIsVisible(false), remaining)

    return () => window.clearTimeout(timeoutId)
  }, [isBusy, isVisible])

  useEffect(() => {
    if (!onVisibilityChange) {
      return
    }

    onVisibilityChange(isVisible)
  }, [isVisible, onVisibilityChange])

  if (!isVisible) {
    return null
  }

  return <LoadingOverlay scope="content" label="Fetching latest content..." />
}

export default RouteLoadingOverlay