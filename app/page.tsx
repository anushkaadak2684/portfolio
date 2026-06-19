import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Highlights from "./components/Highlights/Highlights";
import About from "./components/About/About";
import FeaturedWork from "./components/FeaturedWork/FeaturedWork";
import Recognition from "./components/Recognition/Recognition";
import DevProfile from "./components/DevProfile/DevProfile";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AskAdak from "./components/AskAdak/AskAdak";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <FeaturedWork />
        <Recognition />
        <DevProfile />
        <Contact />
      </main>
      <Footer />

      {/* Global floating overlay — persists across all sections */}
      <AskAdak />
    </>
  );
}

