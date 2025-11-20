import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

const UserProfile = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  });

  if (!userId) return <p>No user ID provided.</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.user) return <p>User not found.</p>;

  return (
    <div>
      <h3>Welcome, {data.user.username}!</h3>
      <p>Email: {data.user.email}</p>
    </div>
  );
};

export default UserProfile;
