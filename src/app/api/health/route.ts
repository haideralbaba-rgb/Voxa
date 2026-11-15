export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({
    ok: true,
    service: 'voxa',
    timestamp: new Date().toISOString(),
  })
}
