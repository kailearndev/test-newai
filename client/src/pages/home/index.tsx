import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div
            className="hero min-h-[95svh] rounded-3xl"
            style={{
                backgroundImage: "url(https://storage.googleapis.com/gweb-cloudblog-publish/original_images/da.gif)",
            }}>
            <div className="hero-overlay  rounded-3xl"></div>
            <div className="hero-content text-white text-center animate-pulse">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        Go to Folder
                    </p>
                    <Link to={"/my-folder"}>
                        <button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>

    );
};

export default Home;