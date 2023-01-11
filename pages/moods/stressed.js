/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';

export default function Stressed() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getStressedFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    const flickMoods = [];
    flicksWithMetaData.map((md) => md.moods.filter((mood) => {
      if (mood.moodsName.includes('stressed')) {
        flickMoods.push(md);
      }
    }));
    return flickMoods;
  };

  useEffect(() => {
    getStressedFlicks().then(setFlicks);
  }, [user]);

  const onClick = () => router.push('/moods/moods');

  if (flicks.length <= 0) {
    return (
      <div className="noFlicksDiv">
        <Head>
          <title>POPPED:stressed</title>
          <meta name="description" content="Meta description for the team page" />
        </Head>;
        <h3 className="noFlicksFound">No flicks found matching this mood.</h3>
        <button type="button" onClick={onClick} className="backToMoodsBtn noFlicksBtn">previous page</button>
      </div>
    );
  } return (
    <>
      <Head>
        <title>POPPED:stressed</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>;
      <button type="button" onClick={onClick} className="backToMoodsBtn foundFlicksBtn">previous page</button>
      <div className="d-flex flex-wrap cardContainer moodsCardsDiv">
        {flicks?.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getStressedFlicks} />)}
      </div>
    </>
  );
}
