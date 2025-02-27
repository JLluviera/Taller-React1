import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ListAreas = () => {
    const user = useSelector((state) => state.user)
    const [areas, setAreas] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const pageSize = 10;

  return (
    <div>ListAreas</div>
  )
}

export default ListAreas