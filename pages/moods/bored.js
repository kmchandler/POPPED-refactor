/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';

export default function Bored() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getBoredFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    const flickMoods = [];
    flicksWithMetaData.map((md) => md.moods.filter((mood) => {
      if (mood.mood_name.includes('bored')) {
        flickMoods.push(md);
      }
    }));
    return flickMoods;
  };

  useEffect(() => {
    getBoredFlicks().then(setFlicks);
  }, [user]);

  const onClick = () => router.push('/moods/moods');

  if (flicks.length <= 0) {
    return (
      <div className="noFlicksDiv">
        <Head>
          <title>POPPED:bored</title>
          <meta name="bored" content="bored" />
        </Head>;
        <h3 className="noFlicksFound">No flicks found matching this mood.</h3>
        <button type="button" onClick={onClick} className="backToMoodsBtn noFlicksBtn">previous page</button>
      </div>
    );
  } return (
    <>
      <Head>
        <title>POPPED:bored</title>
        <meta name="bored" content="bored" />
      </Head>;
      <button type="button" onClick={onClick} className="backToMoodsBtn foundFlicksBtn">previous page</button>
      <div className="d-flex flex-wrap cardContainer moodsCardsDiv">
        {flicks?.map((flix) => <FlickCard key={flix.id} flickObj={flix} onUpdate={getBoredFlicks} />)}
      </div>
    </>
  );
}
