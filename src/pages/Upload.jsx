
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


const Upload = () => {

    const [imageUrl, setImageUrl] = useState("");
    const [postCaption, setPostCaption] = useState("");
    const [isSharingPost, setIsSharingPost] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        window.FB.getLoginStatus((response) => {
            let token = response.authResponse?.accessToken
            if (token) {
                localStorage.setItem("token", token)
            } else {
                navigate("/", { replace: true })
            }
        });
    }, []);


    const logOutOfFB = () => {
        window.FB.logout(() => {
            localStorage.clear()
            navigate("/", { replace: true })
        });
    };

    const getFacebookPages = () => {
        return new Promise((resolve) => {
            window.FB.api(
                "me/accounts",
                { access_token: localStorage.getItem("token") },
                (response) => {
                    resolve(response.data);
                }
            );
        });
    };

    const getInstagramAccountId = (facebookPageId) => {
        return new Promise((resolve) => {
            window.FB.api(
                facebookPageId,
                {
                    access_token: localStorage.getItem("token"),
                    fields: "instagram_business_account",
                },
                (response) => {
                    resolve(response.instagram_business_account.id);
                }
            );
        });
    };

    const createMediaObjectContainer = (instagramAccountId) => {
        return new Promise((resolve) => {
            window.FB.api(
                `${instagramAccountId}/media`,
                "POST",
                {
                    access_token: localStorage.getItem("token"),
                    image_url: imageUrl,
                    caption: postCaption,
                },
                (response) => {
                    resolve(response.id);
                }
            );
        });
    };

    const publishMediaObjectContainer = (
        instagramAccountId,
        mediaObjectContainerId
    ) => {
        return new Promise((resolve) => {
            window.FB.api(
                `${instagramAccountId}/media_publish`,
                "POST",
                {
                    access_token: localStorage.getItem("token"),
                    creation_id: mediaObjectContainerId,
                },
                (response) => {
                    resolve(response.id);
                }
            );
        });
    };

    const shareInstagramPost = async () => {
        setIsSharingPost(true);
        const facebookPages = await getFacebookPages();
        const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
        const mediaObjectContainerId = await createMediaObjectContainer(
            instagramAccountId
        );

        await publishMediaObjectContainer(
            instagramAccountId,
            mediaObjectContainerId
        );

        setIsSharingPost(false);

        // Reset the form state
        setImageUrl("");
        setPostCaption("");
    };


    return (
        <main className='mx-auto upload-card' >
            <button className='btn btn-outline-secondary mt-2' onClick={logOutOfFB}>LogOut</button>
            <section className="d-flex flex-column w-100 card shadow-lg p-4 mt-5  mx-auto">
                <h3 className='mt-4'>Send a post to Instagram</h3>
                <input
                    className='p-2 rounded border outline-none'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter a JPEG image url..."
                />
                <textarea
                    className='p-2 rounded border outline-none my-3'
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                    placeholder="Write a caption..."
                    rows="10"
                />
                <button
                    onClick={shareInstagramPost}
                    className="btn btn-success"
                    disabled={isSharingPost || !imageUrl}
                >
                    {isSharingPost ? "Sharing..." : "Share"}
                </button>
            </section>
        </main>
    );
}

export default Upload;