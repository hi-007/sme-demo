import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ServicesSection from "../components/ServicesSection";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import FaqSection from "../components/FaqSection";
const LandingPage: React.FC = () => {

  return (
    <>
      <div className="font-sans">
        <Navigation />
        <div id="home">
          <HeroSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
