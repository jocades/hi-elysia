import { Elysia } from 'elysia'
import { compile as c, trpc } from '@elysiajs/trpc'
import { initTRPC } from '@trpc/server'
import { renderTrpcPanel } from 'trpc-panel'

const t = initTRPC.create()
const publicProcedure = t.procedure

const appRouter = t.router({
  ping: publicProcedure.query((opts) => 'pong'),
})

export type AppRouter = typeof appRouter

const app = new Elysia()

app.all('/docs', ({ set }) => {
  set.headers = { 'Content-Type': 'text/html' }
  return renderTrpcPanel(appRouter, { url: '/trpc' })
})

app.get('/ping', () => 'pong')

app.get('/health', (ctx) => {
  return {
    path: ctx.path,
    params: ctx.params,
    body: ctx.body,
    query: ctx.query,
  }
})

app.use(trpc(appRouter)).listen(process.env.PORT!)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
