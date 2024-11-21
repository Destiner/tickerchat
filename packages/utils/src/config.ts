export const MOXIE_ADDRESS = '0x8c9037d1ef5c6d1f6816278c7aaf5491d24cd527'
export const COMMENT_ADDRESS = '0x0000000000000000000000000000000000000000'

export const TOKEN_CONFIG: Record<
  string,
  {
    ticker: string
    postAmount: string
    promoteAmount: string
    deleteAmount: string
    farcasterChannel: string
    farcasterUsername: string
    fid: number
  }
> = {
  [MOXIE_ADDRESS]: {
    ticker: 'MOXIE',
    postAmount: '10000000000000000000000',
    promoteAmount: '1000000000000000000000000',
    deleteAmount: '1000000000000000000000000',
    farcasterChannel: 'moxie',
    farcasterUsername: 'tickerchat',
    fid: 882553,
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
