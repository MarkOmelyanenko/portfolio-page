import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import Archive from "./components/Archive";
import OpenSource from "./components/OpenSource";
import Experience from "./components/Experience";
import Technologies from "./components/Technologies";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <a href="#work" className="sr-only">
        Skip to work
      </a>
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
        <OpenSource />
        <Experience />
        <Technologies />
        <About />
        <Archive />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
