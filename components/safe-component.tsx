"use client"

import React from "react"

interface SafeComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SafeComponent({ children, fallback = null }: SafeComponentProps) {
  try {
    return <>{children}</>
  } catch (error) {
    console.error("SafeComponent caught error:", error)
    return <>{fallback}</>
  }
}

// Safe wrapper for form inputs
export function SafeInput(props: React.ComponentProps<"input">) {
  const { value, defaultValue, onChange, ...restProps } = props

  // Ensure we don't pass undefined values that could cause React warnings
  const safeProps = React.useMemo(() => {
    if (onChange && value !== undefined) {
      // Controlled component
      return { value: value ?? "", onChange }
    } else if (defaultValue !== undefined) {
      // Uncontrolled component with default value
      return { defaultValue: defaultValue ?? "" }
    } else {
      // Uncontrolled component without default value
      return {}
    }
  }, [value, defaultValue, onChange])

  return <input {...safeProps} {...restProps} />
}
