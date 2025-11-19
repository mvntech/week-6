import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
  query {
    user(id: "691d974a86f14d02804dbe06") {
      id
      username
      email
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>User's Data</h1>
      <p>ID: {data.user.id}</p>
      <p>Username: {data.user.username}</p>
      <p>Email: {data.user.email}</p>
    </div>
  );
};

export default UsersList;
