import "./Home.css";

import StyleStudio from "./HomeComponent/StyleStudio";
// import OutfitPreview from "./HomeComponent/OutfitPreview";
// import ProductPanel from "./HomeComponent/ProductPanel";
import UsedProducts from "./HomeComponent/UsedProducts";

export default function Home() {

    return(

        <main className="home">

            <header className="hero">

                <h1>

                    Dress

                    <span> Smarter.</span>

                </h1>

            </header>

            <section className="workspace">

                <aside className="workspace-left">

                    <StyleStudio/>

                </aside>

                <section className="workspace-center">

                    {/* <OutfitPreview/> */}

                    <div className="placeholder">

                        Outfit Preview

                    </div>

                </section>

                <aside className="workspace-right">

                    <UsedProducts/>

                </aside>

            </section>

            <section className="explore">

                <h2>

                    Trending For You

                </h2>

            </section>

        </main>

    );

}