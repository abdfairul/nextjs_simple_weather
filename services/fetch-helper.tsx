import getConfig from 'next/config';
import { userService } from './user-service';
const { publicRuntimeConfig } = getConfig();

export const fetchHelper = {
    get,
    post,
};

function get(url:any) {
    let requestHeaders: any = { 'Content-Type': 'application/json', ...authHeader(url)  };
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: requestHeaders
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url:any, body:any) {
    let requestHeaders: any = { 'Content-Type': 'application/json', ...authHeader(url)  };
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: requestHeaders,
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url:any) {
    const user = userService.userValue;
    const isLoggedIn = user && user.authdata;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Basic ${user.authdata}` };
    } else {
        return {};
    }
}

function handleResponse(response:any) {
    let p: Promise<string> = response.text()
    return p.then((text) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function request<TResponse>(
  url: string,
  config: RequestInit = {}
   
): Promise<TResponse> {
    
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}