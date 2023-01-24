import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getSingleUserWithMetaData } from '../../../api/mergedData';
import CreateUserForm from '../../../components/CreateUserForm';

  <Head>
    <title>POPPED:edit profile</title>
    <meta name="edit_user" content="edit user" />
  </Head>;

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUserWithMetaData(id).then(setEditItem);
  }, [id]);
  return (<CreateUserForm obj={editItem} />);
}
