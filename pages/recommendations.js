/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getFlicksByUid } from '../api/flicksData';
import RecommendationCard from '../components/RecommendationCard';

export default function Recommendations() {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();

  const getRecommendedFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUid(user.uid);
    const recommendedFlicks = [];

    flicksWithMetaData.map((rec) => {
      if (rec.recommended_by) {
        recommendedFlicks.push(rec);
      }
    });
    return recommendedFlicks;
  };

  useEffect(() => {
    getRecommendedFlicks().then(setFlicks);
  }, [user]);

  if (flicks.length <= 0) {
    return (
      <div className="noRecsDiv">
        <Head>
          <title>POPPED:recommendations</title>
          <meta name="recommendations" content="Recommendations" />
        </Head>
        <h1 className="noRecommendationHeader">recommendations</h1>
        <h3 className="noRecommendations">no recommendations found.</h3>
      </div>
    );
  } return (
    <>
      <Head>
        <title>POPPED:recommendations</title>
        <meta name="recommendations" content="Recommendations" />
      </Head>;
      <h1 className="recommendationHeader">recommendations</h1>
      <div className="d-flex flex-wrap cardContainer recommendationCardDiv">
        {flicks?.map((flix) => <RecommendationCard key={flix.id} flickObj={flix} onUpdate={getRecommendedFlicks} />)}
      </div>
    </>
  );
}
