import { ErrorT, Status, User } from '../types'
import { loginUser, registerUser } from '../store/auth/auth-thunks'
import { RefObject, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectAuthError, selectAuthStatus, selectAuthUser } from '../store/auth/auth-selectors';
import { clearError, logoutUser } from '../store/auth/auth-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes';


interface AuthHookResult {
    login: RefObject<HTMLInputElement>;
    password: RefObject<HTMLInputElement>;
    submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
    user: User | null;
    error: ErrorT | null;
    status: Status;
    ResetError: () => void;
    logOut: () => void;
}

const useAuth = (
    method?: typeof registerUser | typeof loginUser
): AuthHookResult => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const login = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const user = useAppSelector(selectAuthUser);
    const error = useAppSelector(selectAuthError);
    const status = useAppSelector(selectAuthStatus);

    const logOut = () => dispatch(logoutUser())

    const submitHandler = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        if (login.current && password.current) {
            const data = {
                login: login.current.value,
                password: password.current.value,
            };
            if (method === registerUser) {
                try {
                    unwrapResult(await dispatch(registerUser(data)))
                    navigate(ROUTES.LOGIN)
                } catch(err) {  
                    console.error(err)
                }
            } else if (method === loginUser) {
                try {
                    unwrapResult(await dispatch(loginUser(data)))
                    navigate(ROUTES.HOME)
                } catch (err) {
                    console.error(err)
                }
            }
        };
    }

    const ResetError = () => {
        useEffect(() => {
            dispatch(clearError())
        }, [])
    }



    return { login, password, submitHandler, user, error, status, ResetError, logOut };
};

export default useAuth;
