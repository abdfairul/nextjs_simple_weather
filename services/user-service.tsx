import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import {fetchHelper} from './fetch-helper';

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user') || '{}'));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { 
        if (!userSubject.value || !userSubject.value.username){
            return null
        }

        return userSubject.value
    },
    login,
    logout,
};

function login(username:any, password:any) {
    return fetchHelper.post(`api/authenticate`, { username, password })
        .then(user => {
            user.authdata = window.btoa(username + ':' + password);
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        })
        .catch(err => {
            alert(err);
        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}
