import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function TryAgain() {
  const router = useRouter();
  const onClick = () => router.push('/shuffle');
  return (
    <div className="tryAgainDiv">
      <Head>
        <title>POPPED:try again</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>;
      <h3 className="noFlicksRec">no flicks found matching this criteria. please go back and try again.</h3>
      <button type="button" className="tryAgainBtn" onClick={onClick}>try again</button>
    </div>
  );
}
