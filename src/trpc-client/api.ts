import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '../server'

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000/trpc',

      // You can pass any HTTP headers you wish here
      async headers() {
        return {}
      },
    }),
  ],
})
