import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import { Flex, Box, Text, Image } from "rebass"
import { useForm } from "react-hook-form"

import { AccountContext } from "../context/account"
import LoginLayout from "../components/login-layout"
import SEO from "../components/seo"
import InputField from "../components/input"
import Button from "../components/button"
import Spinner from "../components/spinner"
import Graphic from "../assets/login-graphic.png"

import MedusaClient from "../services/api"

const IndexPage = () => {
  const [loading, setLoading] = useState(false)
  const account = useContext(AccountContext)
  const { register, handleSubmit } = useForm()

  const handleLogin = data => {
    setLoading(true)
    account
      .handleLogin(data)
      .then(() => {
        navigate("/a")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <LoginLayout pt={3} title={"Login"}>
      <SEO title="Login" />
      <Text mb={4} fontWeight="bold" fontSize={4}>
        Sign in
      </Text>
      <Box as="form" onSubmit={handleSubmit(handleLogin)}>
        {loading ? (
          <Flex justifyContent="center">
            <Spinner dark width="20px" height="20px" />
          </Flex>
        ) : (
          <>
            <InputField
              mb={3}
              label="Email"
              name="email"
              ref={register}
              boldLabel={true}
            />
            <InputField
              type="password"
              label="Password"
              boldLabel={true}
              name="password"
              ref={register}
            />
            <Button type="submit" variant={"cta"} mt={4} width={1}>
              Login
            </Button>
          </>
        )}
      </Box>
    </LoginLayout>
  )
}

export default IndexPage
