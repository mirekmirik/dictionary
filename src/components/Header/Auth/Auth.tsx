import SignIn from './SignIn'
import SignUp from './SignUp'
import { useParams, useNavigate } from 'react-router-dom'


export interface SignProps {
    onHandleClose: () => void,
    style: {
        [key: string]: string | number
    }
}

const Auth = () => {

    const { type } = useParams()
    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/')
    };


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '10px 10px 10px 10px'
    };

    return (
        <>
            {type === 'login' && <SignIn onHandleClose={handleClose} style={style} />}
            {type === 'register' && <SignUp onHandleClose={handleClose} style={style} />}
        </>
    )
}

export default Auth