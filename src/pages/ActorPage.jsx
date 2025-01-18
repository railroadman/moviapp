import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActorDetails from '../components/ActerDetails'
import { getActorDetails } from '../services/api'

const ActorPage = () => {
  const { id } = useParams()
  const [actor, setActor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActorDetails(id)
        setActor(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!actor) return <div>Actor not found</div>

  return <ActorDetails actor={actor} />
}

export default ActorPage
