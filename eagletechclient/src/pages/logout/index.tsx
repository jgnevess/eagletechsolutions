import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";



const Logout = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStorage.length > 0) {
      sessionStorage.clear()
      localStorage.clear()
      setLoading(true)
    } else {
      window.location.href = '/login'
    }
  }, [loading])

  return <Loading />
}

export default Logout