import { buildHoldersTree } from '@anon/utils/src/merkle-tree'
import { TOKEN_CONFIG, TOKENS } from '@anon/utils/src/config'
import Redis from 'ioredis'
import { ProofType } from '@anon/utils/src/proofs'
const redis = new Redis(process.env.REDIS_URL as string)

const MINUTE = 60;
const HOUR = 60 * MINUTE;

const main = async () => {
  for (const address of TOKENS) {
    const config = TOKEN_CONFIG[address]
    await buildAndCacheTree(address, ProofType.CREATE_POST, config.postAmount)
  }
}

main().then(() => {
  process.exit(0)
})

async function buildAndCacheTree(
  tokenAddress: string,
  proofType: ProofType,
  minAmount: string
) {
  const tree = await buildHoldersTree({ tokenAddress, minAmount })
  await redis.set(
    `anon:tree:${tokenAddress}:${proofType}`,
    JSON.stringify(tree),
    'EX',
    2 * HOUR
  )
}
