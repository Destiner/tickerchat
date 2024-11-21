'use client'

import { ConnectButton } from '@/components/connect-button'
import { CreatePost } from '@/components/create-post'
import PostFeed from '@/components/post-feed'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useToken } from '@/hooks/use-token';
import { TOKEN_CONFIG, TOKENS } from '@anon/utils/src/config'
import { CircleHelp } from 'lucide-react'
import { type Address, formatUnits } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'

export default function Home() {
  const { address: tokenAddress, setAddress: setTokenAddress } = useToken();
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const tokenConfig = TOKEN_CONFIG[tokenAddress];

  const getSignature = async ({
    address,
    timestamp,
  }: { address: string; timestamp: number }) => {
    try {
      const message = `${address}:${timestamp}`
      const signature = await signMessageAsync({
        message,
      })
      return { signature, message }
    } catch {
      return
    }
  }

  function handleChange(newValue: Address): void {
    setTokenAddress(newValue);
  }

  return (
    <div className="flex h-screen w-screen flex-col p-4 max-w-screen-sm mx-auto gap-8">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">tickerchat</div>
        <ConnectButton />
      </div>
      <Alert>
        <CircleHelp className="h-4 w-4" />
        <AlertTitle className="font-bold">
          Anonymous chat for every community
        </AlertTitle>
        <AlertDescription>
          Posts are made anonymous using zk proofs. It could take up to a few minutes to post.
          <br />
          <br />
          The channel is selected based on the token ticker.
          <br />
          <br />
          Own { formatUnits(BigInt(tokenConfig.postAmount), 18) } { tokenConfig.ticker } to post to /{ tokenConfig.farcasterChannel }
        </AlertDescription>
        <div className="mt-4 flex flex-row gap-2 justify-end">
          <a
            href="https://warpcast.com/tickerchat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 font-semibold"
          >
            Farcaster
          </a>
        </div>
      </Alert>

      <ToggleGroup type="single" value={tokenAddress} onValueChange={handleChange}>
        { TOKENS.map((tokenAddress) => (
          <ToggleGroupItem key={tokenAddress} value={tokenAddress}>
            ${ TOKEN_CONFIG[tokenAddress].ticker }
          </ToggleGroupItem>
        )) }
      </ToggleGroup>

      {address && (
        <CreatePost
          tokenAddress={tokenAddress}
          userAddress={address}
          getSignature={getSignature}
        />
      )}
      <PostFeed tokenAddress={tokenAddress} userAddress={address} />
    </div>
  )
}
