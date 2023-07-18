import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { MoonLoader } from 'react-spinners';
import styles from '../styles/Home.module.css';
import { Card, Text, Metric, AreaChart, ColGrid, Title } from "@tremor/react";
import { holonymApiUrl } from '../constants/misc';
import TimeseriesAreaChart from '../components/TimeseriesAreaChart'
import useApiKey from '../hooks/useApiKey'

export default function Verifications() {
  const { apiKey } = useApiKey();

  return (
    <div>
      <div className={styles.container}>

        <main className={styles.main}>

        </main>

      </div>
    </div>
  )
}
