import { Redis } from 'ioredis'
import { createElysia } from '../utils'
import { t } from 'elysia'
import { buildHoldersTree } from '@anon/utils/src/merkle-tree'
import { ProofType } from '@anon/utils/src/proofs'
import { TOKEN_CONFIG } from '@anon/utils/src/config'

const redis = new Redis(process.env.REDIS_URL as string)

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const merkleTreeRoutes = createElysia({ prefix: '/merkle-tree' }).post(
  '/',
  async ({ body }) => {
    const cachedTree = await redis.get(
      `anon:tree:${body.tokenAddress}:${body.proofType}`
    )
    if (cachedTree) {
      return JSON.parse(cachedTree)
    }

    const config = TOKEN_CONFIG[body.tokenAddress]

    let minAmount = config.postAmount

    const tree = await buildHoldersTree({
      tokenAddress: body.tokenAddress,
      minAmount,
    })

    await redis.set(
      `anon:tree:${body.tokenAddress}:${body.proofType}`,
      JSON.stringify(tree),
      'EX',
      2 * HOUR
    )

    return tree
  },
  {
    body: t.Object({
      tokenAddress: t.String(),
      proofType: t.Enum(ProofType),
    }),
  }
)
