import Footer from "../Footer/Footer";
import Section from "../Section/Section";
import Slider from "../Slider/Slider";

export default function Content() {
  return (
    <div className="flex flex-col">
      <div className="bg-[#0371b121] p-7">
        <Slider />
      </div>
      <div>
        <Section />
      </div>

      {/* <Footer /> */}
    </div>
  );
}
