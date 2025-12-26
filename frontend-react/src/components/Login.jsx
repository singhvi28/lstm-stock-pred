import axios from 'axios';
import React, {useState} from 'react'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inval, setInval] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      const userData = {
        username: username,
        password: password,
      };
      console.log(userData)

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        setLoading(false);
        setInval(true);
        console.log('Invalid credentials')
      }
    }

    return (
        <>
        <div className='container'>
            <div className='row justify-content-center pt-5 pb-5 bg-light-dark rounded'>
                <div className='col-md-6'>
                    <h3 className='text-light text-center'>Login to the Portal</h3>
                    <form onSubmit={handleLogin}>
                        <div className='mb-3'>
                        <input
                            type="text" 
                            className='form-control'
                            placeholder='Enter Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div className='mb-3'>
                        <input
                            type="password"
                            className='form-control'
                            placeholder='Set Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>

                        {inval && <div className='alert alert-warning'>Invalid credentials!</div> }

                        <button
                        type="submit"
                        className="btn btn-info d-block mx-auto"
                        disabled={loading}
                        >
                        {loading ? 'Logging in...' : 'Login'}
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login
