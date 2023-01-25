import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleFlickWithMetaData } from '../../../api/mergedData';
import FlickForm from '../../../components/FlickForm';

export default function EditFlick() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleFlickWithMetaData(id).then(setEditItem);
  }, [id]);

  if (!editItem.id) return null;

  return (<FlickForm obj={editItem} />);
}
