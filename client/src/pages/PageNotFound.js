import React from 'react';
import pagenotfound from "../assets/Images/pagenotfound.svg"
function PageNotFound() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center mt-5">
                    <img
                        src={pagenotfound}
                        alt="404 Error"
                        className="img-fluid"
                    />
                    <h1 className="mt-3">404 - Page Not Found</h1>
                    <p className="text-muted">The page you are looking for does not exist.</p>
                    <a href="/" className="btn btn-primary mt-3">
                        Go to Home
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
