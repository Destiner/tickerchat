import { QueueName, getWorker, getQueue } from './utils'
import { handler } from './handler'
import { Redis } from 'ioredis'
import { ProofType } from '@anon/utils/src/proofs'

const redis = new Redis(process.env.REDIS_URL as string)

const run = async () => {
  // Start worker
  const usePromotePost = !!process.argv[2]
  const queueName = usePromotePost ? QueueName.PromotePost : QueueName.Default
  console.info(`Starting worker for ${queueName}`)
  const worker = getWorker(queueName, async (job) => {
    if (job.data.type === ProofType.PROMOTE_POST) {
      const rateLimit = await redis.get('twitter:rate-limit')
      if (rateLimit) {
        job.moveToDelayed(Number.parseInt(rateLimit) * 1000)
        console.info(`[${job.id}] rate limit hit, delaying ${job.data.type}`)
        return
      }
    }

    console.info(`[${job.id}] started ${job.data.type}`)
    await handler(job.data)
    console.info(`[${job.id}] completed ${job.data.type}`)
  })

  worker.on('failed', (job, err) => {
    if (job) {
      console.info(`[${job.id}] failed with ${err.message}`)
    }
  })
}

run().catch((e) => {
  console.error(e)
})
