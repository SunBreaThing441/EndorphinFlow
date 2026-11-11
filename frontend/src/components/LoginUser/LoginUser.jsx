import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function LoginUser() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h2>UserLogin</h2>
      <button onClick={() => setUser('')}>Change User</button>
    </div>
  );
}
