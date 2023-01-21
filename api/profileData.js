import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createUserAndGenres = async (formData) => {
  const response = await fetch(`${dbUrl}/profile`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
};

const updateUserAndGenres = async (formData) => {
  const response = await fetch(`${dbUrl}/profile`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
};

export {
  createUserAndGenres,
  updateUserAndGenres,
};
