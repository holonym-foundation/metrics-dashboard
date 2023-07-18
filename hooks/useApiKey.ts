import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { holonymApiUrl } from '../constants/misc';

export default function useApiKey() {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
    
  const apiKeyQuery = useQuery({
    queryKey: ['getApiKey'],
    queryFn: async () => {
      // Get API key from localStorage or from user input
      let apiKeyTemp = apiKey;
      if (!apiKey) {
        const restoredApiKey = localStorage.getItem('apiKey')
        if (restoredApiKey) {
          apiKeyTemp = restoredApiKey;
        } else {
          apiKeyTemp = prompt("Enter API key") ?? '';
        }
      }
  
      // Validate API key
      return fetch(`/api/auth/validate-api-key?apiKey=${apiKeyTemp}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json()
          } else {
            throw new Error('Invalid API key')
          }
        })
        .then((data) => {
          setApiKey(apiKeyTemp);
          localStorage.setItem('apiKey', apiKeyTemp ?? '')
        })
        .catch((err) => {
          console.error(err)
          alert('Invalid API key. Refresh and try again')
        })
    },
    retry: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
  })

  return {
    apiKey,
  }
}
