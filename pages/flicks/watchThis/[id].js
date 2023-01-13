import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getSingleFlickWithMetaData } from '../../../api/mergedData';
import ShuffleCard from '../../../components/ShuffleCard';

export default function WatchThis() {
  const [result, setResult] = useState({});
  const router = useRouter();
  const { flicksFirebaseKey } = router.query;

  const onClick = () => router.push('/shuffle');

  useEffect(() => {
    getSingleFlickWithMetaData(flicksFirebaseKey).then(setResult);
  }, [flicksFirebaseKey]);

  if (!result.flicksFirebaseKey) {
    return null;
  }
  return (
    <div className="shuffleResultDiv">
      <Head>
        <title>POPPED:watch this</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>;
      <button className="tryAgainButton" type="button" onClick={onClick}>try again</button>
      <ShuffleCard watchObj={result} />
    </div>
  );
}
