import React, { useEffect } from 'react'
import { getFitnessInfo } from '../api'

export default function Account() {
  useEffect(() => {
    async function callGoogleAPI() {

      // const res = await getFitnessInfo()
    }
    callGoogleAPI();
  }, [])
  return (
    <div>Account</div>
  )
}
