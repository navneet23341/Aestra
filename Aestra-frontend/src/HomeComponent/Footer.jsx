import "./Footer.css";

export default function Footer(){

    return(

        <footer className="footer">

            <div className="footer-logo">

                <h2>Mirror</h2>

                <p>

                    AI powered fashion recommendations that help
                    you discover, style and shop outfits effortlessly.

                </p>

            </div>

            <div className="footer-links">

                <div>

                    <h4>Explore</h4>

                    <a href="#">Trending</a>
                    <a href="#">Summer</a>
                    <a href="#">Recommended</a>
                    <a href="#">Sale</a>

                </div>

                <div>

                    <h4>Company</h4>

                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>

                </div>

                <div>

                    <h4>Follow</h4>

                    <a href="#">GitHub</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">Instagram</a>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 Mirror • Crafted with ❤️ in India

            </div>

        </footer>

    );

}