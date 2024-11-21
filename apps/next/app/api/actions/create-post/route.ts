import { NextResponse } from 'next/server'
import type { ActionPayload } from '@/lib/types'

export const runtime = 'edge'

const NEXT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tickerchat.org'
    : 'https://localhost:3000'

export async function POST(request: Request) {
  const body: ActionPayload = await request.json()

  return NextResponse.json({
    type: 'form',
    title: 'Tickerchat',
    url: `${NEXT_SERVER_URL}/actions/create-post?data=${body.trustedData.messageBytes}`,
  })
}

export async function GET() {
  return NextResponse.json({
    type: 'composer',
    name: 'Tickerchat',
    icon: 'question',
    description: 'Anonymous chat for every community',
    aboutUrl: 'https://tickerchat.org',
    imageUrl:
      'https://dd.dexscreener.com/ds-data/tokens/base/0x0db510e79909666d6dec7f5e49370838c16d950f.png?size=lg&key=862023',
    action: {
      type: 'post',
    },
  })
}
