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
  const optimismLeavesQuery = useQuery({
    queryKey: ['optimismLeavesTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/leaves/timeseries/optimism?only-total=true`);
      const data = await resp.json();
      if (data?.result) {
        console.log(data.result)
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of leaves": item.total
        }))
      }
    }
  })
  const optimismUniquenessQuery = useQuery({
    queryKey: ['optimismUniquenessTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/sybil-resistance-count/timeseries/optimism?only-total=true`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of uniqueness proofs": item.total
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
  const testnetLeavesQuery = useQuery({
    queryKey: ['testnetLeavesTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/leaves/timeseries/optimism-goerli?only-total=true`);
      const data = await resp.json();
      if (data?.result) {
        console.log(data.result)
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of leaves": item.total
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


        <h2 style={{ color: 'white', fontSize: '20px' }} >
          Mainnet
        </h2>

        <TimeseriesAreaChart 
          title="Total number of leaves (Optimism)"
          total={optimismLeavesQuery?.data?.length > 0 ? optimismLeavesQuery.data[optimismLeavesQuery.data.length - 1].total : 0}
          data={optimismLeavesQuery.data ? optimismLeavesQuery.data : []}
          categories={["Total number of leaves"]}
        />
        <TimeseriesAreaChart 
          title="Total number of uniqueness proofs (Optimism)"
          total={optimismUniquenessQuery?.data?.length > 0 ? optimismUniquenessQuery.data[optimismUniquenessQuery.data.length - 1].total : 0}
          data={optimismUniquenessQuery.data ? optimismUniquenessQuery.data : []}
          categories={["Total number of uniqueness proofs"]}
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
          title="Total number of leaves (Optimism goerli)"
          total={testnetLeavesQuery?.data?.length > 0 ? testnetLeavesQuery.data[testnetLeavesQuery.data.length - 1].total : 0}
          data={testnetLeavesQuery.data ? testnetLeavesQuery.data : []}
          categories={["Total number of leaves"]}
        />
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
