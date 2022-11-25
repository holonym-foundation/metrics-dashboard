import Head from 'next/head'
import Image from 'next/image'
import { MoonLoader } from 'react-spinners';
import { Card, Text, Metric, AreaChart, ColGrid, Title } from "@tremor/react";

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


export default function TimeseriesAreaChart({ 
  title, 
  total, 
  data,
  categories
}: {
  title: string,
  total: number,
  data: Array<SCEventWithTotal>,
  categories: Array<string>
}) {

  return (
    <Card marginTop="mt-6" maxWidth="max-w-6xl">
      <Text>{title}</Text>
      {data?.length > 0 ? (
        <>
          <Metric>{total}</Metric>
          <AreaChart 
            data={data ? data : []}
            categories={categories}
            dataKey="dateStr"
            colors={["blue"]}
            showXAxis={true}
            showYAxis={true}
            showTooltip={true}
            showLegend={true}
            showGridLines={true}
            showAnimation={true}
            height="h-80"
          />
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MoonLoader color="rgb(30 64 175)" />
        </div>
      )}
    </Card>
  )
}

