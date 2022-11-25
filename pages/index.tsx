import Head from 'next/head'
import Image from 'next/image'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { MoonLoader } from 'react-spinners';
import styles from '../styles/Home.module.css'
import { Card, Text, Metric, AreaChart, ColGrid, Title } from "@tremor/react";
import { holonymApiUrl } from '../constants/misc';
import TimeseriesAreaChart from '../components/TimeseriesAreaChart'

interface TimeseriesObject {
  // timestamp: number
  timestamp: string
}

interface USResidencyTimeseriesObject extends TimeseriesObject {
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
  const leavesQuery = useQuery({
    queryKey: ['leavesTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/leaves/timeseries`);
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of leaves": item.total
        }))
      }
    }
  })
  const uniquenessQuery = useQuery({
    queryKey: ['uniquenessTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/sybil-resistance-count/timeseries`)
      const data = await resp.json();
      if (data?.result) {
        return data.result.map((item: SCEventWithTotal) => ({
          ...item,
          "Total number of uniqueness proofs": item.total
        }))
      }
    }
  })
  const usResidencyQuery = useQuery({
    queryKey: ['usResidencyTimeseries'],
    queryFn: async () => {
      const resp = await fetch(`${holonymApiUrl}/metrics/us-residency-count/timeseries`)
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

        <TimeseriesAreaChart 
          title="Total number of leaves"
          total={leavesQuery?.data ? leavesQuery.data[leavesQuery.data.length - 1].total : 0}
          data={leavesQuery.data ? leavesQuery.data : []}
          categories={["Total number of leaves"]}
        />
        <TimeseriesAreaChart 
          title="Total number of uniqueness proofs"
          total={uniquenessQuery?.data ? uniquenessQuery.data[uniquenessQuery.data.length - 1].total : 0}
          data={uniquenessQuery.data ? uniquenessQuery.data : []}
          categories={["Total number of uniqueness proofs"]}
        />
        <TimeseriesAreaChart 
          title="Total number of US residency proofs"
          total={usResidencyQuery?.data ? usResidencyQuery.data[usResidencyQuery.data.length - 1].total : 0}
          data={usResidencyQuery.data ? usResidencyQuery.data : []}
          categories={["Total number of US residency proofs"]}
        />

      </main>

    </div>
  )
}
