import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getSingleFlickWithMetaData } from '../../../api/mergedData';
import ShuffleCard from '../../../components/ShuffleCard';

export default function WatchThis() {
  const [result, setResult] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const onClick = () => router.push('/shuffle');

  useEffect(() => {
    getSingleFlickWithMetaData(id).then(setResult);
  }, [id]);

  if (!result.id) {
    return null;
  }
  return (
    <div className="shuffleResultDiv">
      <Head>
        <title>POPPED:watch this</title>
        <meta name="watchThis" content="Watch this" />
      </Head>;
      <button className="tryAgainButton" type="button" onClick={onClick}>try again</button>
      <ShuffleCard watchObj={result} />
    </div>
  );
}
