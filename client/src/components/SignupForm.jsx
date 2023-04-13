import React, { useContext } from 'react'
import { UserContext } from "../context/user";

const SignupForm = () => {
  const { user } = useContext(UserContext);
  return (
    <div>SignupForm</div>
  )
}

export default SignupForm