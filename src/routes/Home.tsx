import { useState } from 'react'
import Error from '../components/Error';
import Search from '../components/Search'
import User from '../components/User';
import { UserProps } from '../types/user';


const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async(userName: string) => {
      setError(false);
      setUser(null);

      const res = await fetch(`https://api.github.com/users/${userName}`)
      const data = await res.json();

      if(res.status === 404){
        setError(true)
        setUser(null)
        return;
      }

      const {avatar_url, login, location, followers, following} = data;

      const userData: UserProps = {
        avatar_url,
        login,
        location,
        followers,
        following
      }

      setUser(userData)
    }

  return (
    <div>
        <Search loadUser={loadUser}/>
        {user && <User {...user}/>}
        {error && <Error/>}
    </div>
  )
}

export default Home