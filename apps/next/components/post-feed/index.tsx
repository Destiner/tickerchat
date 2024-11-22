import type { Cast } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { Heart, MessageSquare, RefreshCcw } from 'lucide-react'
import { api } from '@/lib/api'

export default function PostFeed() {
  const { data: newPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Cast[]> => {
      const response = await api.getGlobalNewPosts()
      return response?.casts || []
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <Posts casts={newPosts} />
    </div>
  )
}

function Posts({
  casts,
}: { casts?: Cast[] }) {
  return (
    <div className="flex flex-col gap-4">
      {casts?.map((cast) => (
        <Post key={cast.hash} cast={cast} />
      ))}
    </div>
  )
}

export function Post({
  cast,
}: { cast: Cast; }) {
  return (
    <div className="relative">
      <a
        href={`https://warpcast.com/${cast.author.username}/${cast.hash.slice(0, 10)}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-row gap-4 border p-4 rounded-xl">
          <img src={cast.author?.pfp_url} className="w-10 h-10 rounded-full" alt="pfp" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row items-center gap-2">
              <div className="text-md font-bold">{cast.author?.username}</div>
              <div className="text-sm font-semibold">{timeAgo(cast.timestamp)}</div>
            </div>
            <div className="text-md">{cast.text}</div>
            {cast.embeds.map((embed) => {
              if (embed.metadata?.image) {
                return <img key={embed.url} src={embed.url} alt="embed" />
              }
              if (embed.metadata?.html) {
                return (
                  <div
                    key={embed.url}
                    className="w-full border rounded-xl overflow-hidden"
                  >
                    {embed.metadata?.html?.ogImage &&
                      embed.metadata?.html?.ogImage.length > 0 && (
                        <img
                          src={embed.metadata?.html?.ogImage?.[0]?.url}
                          alt={embed.metadata?.html?.ogImage?.[0]?.alt}
                          className="object-cover aspect-video"
                        />
                      )}
                    <div className="p-2">
                      <h3 className="text-lg font-bold">
                        {embed.metadata?.html?.ogTitle}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {embed.metadata?.html?.ogDescription}
                      </p>
                    </div>
                  </div>
                )
              }

              if (embed.cast) {
                return (
                  <div
                    key={embed.cast.hash}
                    className="flex flex-row gap-4 border p-4 rounded-xl"
                  >
                    <img
                      src={embed.cast.author?.pfp_url}
                      className="w-10 h-10 rounded-full"
                      alt="pfp"
                    />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row items-center gap-2">
                        <div className="text-md font-bold">
                          {embed.cast.author?.username}
                        </div>
                        <div className="text-sm font-semibold">
                          {timeAgo(embed.cast.timestamp)}
                        </div>
                      </div>
                      <div className="text-md">{embed.cast.text}</div>
                    </div>
                  </div>
                )
              }

              return <div key={embed.url}>{embed.url}</div>
            })}
            <div className="flex flex-row items-center gap-2 mt-2">
              <div className="flex flex-row items-center gap-2 w-16">
                <MessageSquare size={16} />
                <p className="text-sm font-semibold">{cast.replies.count}</p>
              </div>
              <div className="flex flex-row items-center gap-2 w-16">
                <RefreshCcw size={16} />
                <p className="text-sm font-semibold">{cast.reactions.recasts_count}</p>
              </div>
              <div className="flex flex-row items-center gap-2 w-16">
                <Heart size={16} />
                <p className="text-sm font-semibold">{cast.reactions.likes_count}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

function timeAgo(timestamp: string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `${count}${interval.label} ago`
    }
  }

  return 'just now'
}
