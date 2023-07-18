// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.apiKey) {
    console.log('no api key provided')
    return res.status(400).json({ error: 'No API key provided' })
  }

  if (req.query.apiKey !== process.env.HOLONYM_API_KEY) {
    console.log('invalid api key')
    return res.status(401).json({ error: 'Invalid API key' })
  }

  console.log('successfully validated api key')
  return res.status(200).json({ success: true })
}
