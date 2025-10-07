import Section from "../Section/Section";
import Slider from "../Slider/Slider";

export default function Content() {
  return (
    <div className="h-screen">
      <div className="bg-[#0371b121] p-7">
        <Slider />
      </div>
      <div className="h-100">
        <Section />
      </div>

    </div>
  );
}
