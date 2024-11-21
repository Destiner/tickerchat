'use client'

import { ConnectButton } from '@/components/connect-button'
import { CreatePost } from '@/components/create-post'
import PostFeed from '@/components/post-feed'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MOXIE_ADDRESS } from '@anon/utils/src/config'
import { CircleHelp } from 'lucide-react'
import { useAccount, useSignMessage } from 'wagmi'

export default function Home() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

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

  return (
    <div className="flex h-screen w-screen flex-col p-4 max-w-screen-sm mx-auto gap-8">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">tickerchat</div>
        <ConnectButton />
      </div>
      <Alert>
        <CircleHelp className="h-4 w-4" />
        <AlertTitle className="font-bold">
          Post anonymously to Farcaster and X/Twitter
        </AlertTitle>
        <AlertDescription>
          Posts are made anonymous using zk proofs. Due to the complex calculations
          required, it could take up to a few minutes to post and take other actions.
          We&apos;ll work on speeding this up in the future.
          <br />
          <br />
          <b>Requirements:</b>
          <ul>
            <li>
              Own 10K MOXIE to post on Farcaster
            </li>
          </ul>
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
      {address && (
        <CreatePost
          tokenAddress={MOXIE_ADDRESS}
          userAddress={address}
          getSignature={getSignature}
        />
      )}
      <PostFeed tokenAddress={MOXIE_ADDRESS} userAddress={address} />
    </div>
  )
}
