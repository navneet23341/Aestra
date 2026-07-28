import "./Home.css";

import StyleStudio from "./HomeComponent/StyleStudio";
import OutfitPreview from "./HomeComponent/OutfitPreview";
import UsedProducts from "./HomeComponent/UsedProducts";
import ExploreSection from "./HomeComponent/ExploreSection";
import Footer from "./HomeComponent/Footer";
import Header from "./HomeComponent/Header";


export default function Home() {

    return(
        <>
        <Header/>
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

                    <OutfitPreview/>

                </section>

                <aside className="workspace-right">

                    <UsedProducts/>

                </aside>

            </section>

            <ExploreSection/>

        </main>
        <Footer/>
    </>
    );

}