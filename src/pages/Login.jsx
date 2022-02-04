
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import instagram from '../asset/image/instagram.png'


const Login = () => {

    const navigate = useNavigate()

    const logInToFB = () => {
        window.FB.login(
            (response) => {
                let token = response.authResponse?.accessToken
                if (token) {
                    localStorage.setItem("token", token)
                    navigate("/upload")
                }
            },
            {
                // Scopes that allow us to publish content to Instagram
                scope: "instagram_basic,pages_show_list,pages_manage_posts,instagram_content_publish",
            }
        );
    };

    // Check if the user is authenticated with Facebook
    useEffect(() => {
        window.FB.getLoginStatus((response) => {
            let token = response.authResponse?.accessToken
            if (token) {
                localStorage.setItem("token", token)
                navigate("/upload")
            }
        });
    }, []);

    return (
        <div className='mx-auto'>
            <div className='shadow-md d-flex align-items-center justify-content-center border shadow-lg p-4 flex-column login-card mx-auto rounded' >
                <img src={instagram} className='img-fluid' />
                <h1 class="h3 mb-3 fw-lighter font-monospace">Please Log in</h1>
                <button class="w-100 btn btn-lg btn-outline-secondary mt-3" onClick={logInToFB}>Log in</button>
            </div>
        </div>
    );
}

export default Login;