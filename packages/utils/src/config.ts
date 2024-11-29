import { type Address, parseUnits } from 'viem'

const DEGEN_ADDRESS = '0x4ed4e862860bed51a9570b96d89af5e1b0efefed'
const HIGHER_ADDRESS = '0x0578d8a44db98b23bf096a382e016e29a5ce0ffe'
const MOXIE_ADDRESS = '0x8c9037d1ef5c6d1f6816278c7aaf5491d24cd527'

const FARCASTER_USERNAME = 'tickerchat'
export const FID = 882553

export const TOKENS: Address[] = [DEGEN_ADDRESS, HIGHER_ADDRESS, MOXIE_ADDRESS]

export const TOKEN_CONFIG: Record<
  string,
  {
    ticker: string
    postAmount: string
    farcasterChannel: string
    farcasterUsername: string
    fid: number
  }
> = {
  [DEGEN_ADDRESS]: {
    ticker: 'DEGEN',
    postAmount: parseUnits('150000', 18).toString(),
    farcasterChannel: 'degen',
    farcasterUsername: FARCASTER_USERNAME,
    fid: FID,
  },
  [HIGHER_ADDRESS]: {
    ticker: 'HIGHER',
    postAmount: parseUnits('5000', 18).toString(),
    farcasterChannel: 'higher',
    farcasterUsername: FARCASTER_USERNAME,
    fid: FID,
  },
  [MOXIE_ADDRESS]: {
    ticker: 'MOXIE',
    postAmount: parseUnits('16000', 18).toString(),
    farcasterChannel: 'airstack',
    farcasterUsername: FARCASTER_USERNAME,
    fid: FID,
  },
}

export const USERNAME_TO_ADDRESS: Record<string, string> = Object.entries(
  TOKEN_CONFIG
).reduce(
  (acc, [address, { farcasterUsername }]) => {
    acc[farcasterUsername] = address
    return acc
  },
  {} as Record<string, string>
)
