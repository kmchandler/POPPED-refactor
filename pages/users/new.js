import React from 'react';
import Head from 'next/head';
import CreateUserForm from '../../components/CreateUserForm';

  <Head>
    <title>POPPED:users</title>
    <meta name="description" content="Meta description for the team page" />
  </Head>;

export default function createUser() {
  return (
    <CreateUserForm />
  );
}
