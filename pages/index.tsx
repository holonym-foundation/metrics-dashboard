import Head from 'next/head'
import Image from 'next/image'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { MoonLoader } from 'react-spinners';
import styles from '../styles/Home.module.css';
import { Card, Text, Metric, AreaChart, ColGrid, Title } from "@tremor/react";
import { holonymApiUrl } from '../constants/misc';
import TimeseriesAreaChart from '../components/TimeseriesAreaChart'

interface TimeseriesObject {
  // timestamp: number
  timestamp: string
}

interface testnetUSResidencyTimeseriesObject extends TimeseriesObject {
  "Total number of US residency proofs": number | undefined,
}

interface SmartContractEvent {
  address?: string,
  args?: Array<any>,
  blockHash?: string,
  blockNumber?: number,
  data?: string,
  dateStr?: string,
  event?: string,
  eventSignature?: string,
  logIndex?: number,
  removed?: boolean,
  timestamp?: number,
  topics?: Array<string>,
  transactionHash?: string,
  transactionIndex?: number
}

interface SCEventWithTotal extends SmartContractEvent { 
  total: number
}


export default function Home() {
  const offChainLeavesQuery = useQuery({
    queryKey: ['offChainLeaves'],
    queryFn: async () => {
      const resp = await fetch(`https://relayer.holonym.id/v2/getLeaves`);
      const data = await resp.json();
      return data.length;
    }
  })
  const optimismUniquenessGovIdQuery = useQuery({
    queryKey: ['optimismUniquenessGovIdTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/sybil-resistance-count/timeseries/optimism?only-total=true`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of uniqueness proofs (government ID)": item.total
        }))
      }
    }
  })
  const optimismUniquenessPhoneQuery = useQuery({
    queryKey: ['optimismUniquenessPhoneTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/sybil-resistance-count/phone/timeseries/optimism?only-total=true`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of uniqueness proofs (phone)": item.total
        }))
      }
    }
  })
  const optimismUSResidencyQuery = useQuery({
    queryKey: ['optimismUSResidencyTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/us-residency-count/timeseries/optimism?only-total=true`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of US residency proofs": item.total
        }))
      }
    }
  })
  const testnetUniquenessQuery = useQuery({
    queryKey: ['testnetUniquenessTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/sybil-resistance-count/timeseries/optimism-goerli?only-total=true`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of uniqueness proofs": item.total
        }))
      }
    }
  })
  const testnetUSResidencyQuery = useQuery({
    queryKey: ['testnetUSResidencyTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/us-residency-count/timeseries/optimism-goerli?only-total=true`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of US residency proofs": item.total
        }))
      }
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Holonym Metrics</title>
        <meta name="description" content="Holonym usage metrics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
  
        <h1 style={{ color: 'white', fontSize: '24px' }} >
          Holonym metrics
        </h1>

        <Card marginTop="mt-6" maxWidth="max-w-6xl">
          <Text>Number of leaves in off-chain Merkle tree</Text>
          {offChainLeavesQuery?.data ? (
              <Metric>{offChainLeavesQuery.data}</Metric>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <MoonLoader color="rgb(30 64 175)" />
            </div>
          )}
        </Card>

        <h2 style={{ color: 'white', fontSize: '20px', marginTop: "20px" }}>
          Mainnet
        </h2>

        <TimeseriesAreaChart 
          title="Total number of (government ID) uniqueness proofs (Optimism)"
          total={optimismUniquenessGovIdQuery?.data?.length > 0 ? optimismUniquenessGovIdQuery.data[optimismUniquenessGovIdQuery.data.length - 1].total : 0}
          data={optimismUniquenessGovIdQuery.data ? optimismUniquenessGovIdQuery.data : []}
          categories={["Total number of uniqueness proofs (government ID)"]}
        />
        <TimeseriesAreaChart 
          title="Total number of (phone) uniqueness proofs (Optimism)"
          total={optimismUniquenessPhoneQuery?.data?.length > 0 ? optimismUniquenessPhoneQuery.data[optimismUniquenessPhoneQuery.data.length - 1].total : 0}
          data={optimismUniquenessPhoneQuery.data ? optimismUniquenessPhoneQuery.data : []}
          categories={["Total number of uniqueness proofs (phone)"]}
        />
        <TimeseriesAreaChart 
          title="Total number of US residency proofs (Optimism)"
          total={optimismUSResidencyQuery?.data?.length > 0 ? optimismUSResidencyQuery.data[optimismUSResidencyQuery.data.length - 1].total : 0}
          data={optimismUSResidencyQuery.data ? optimismUSResidencyQuery.data : []}
          categories={["Total number of US residency proofs"]}
        />

        <h2 style={{ color: 'white', fontSize: '20px', marginTop: '25px' }}>
          Testnet
        </h2>

        <TimeseriesAreaChart 
          title="Total number of uniqueness proofs (Optimism goerli)"
          total={testnetUniquenessQuery?.data?.length > 0 ? testnetUniquenessQuery.data[testnetUniquenessQuery.data.length - 1].total : 0}
          data={testnetUniquenessQuery.data ? testnetUniquenessQuery.data : []}
          categories={["Total number of uniqueness proofs"]}
        />
        <TimeseriesAreaChart 
          title="Total number of US residency proofs (Optimism goerli)"
          total={testnetUSResidencyQuery?.data?.length > 0 ? testnetUSResidencyQuery.data[testnetUSResidencyQuery.data.length - 1].total : 0}
          data={testnetUSResidencyQuery.data ? testnetUSResidencyQuery.data : []}
          categories={["Total number of US residency proofs"]}
        />

      </main>

    </div>
  )
}
