import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ variables: { ...formState } });
      alert("User registered successfully!");
      setFormState({ username: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        value={formState.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="text"
        name="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <p>Registration successful for {data.register.user.username} </p>
      )}
    </form>
  );
};

export default SignUp;
