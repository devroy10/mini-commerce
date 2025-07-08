"use client"

import type React from "react"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
// import { ThemeProvider } from "../contexts/theme-context"

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  // Create a client instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Cache data for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 3 times
            retry: 3,
            // Refetch on window focus
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider defaultTheme="system" storageKey="furniture-theme"> */}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  )
}
