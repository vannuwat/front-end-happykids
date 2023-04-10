// import './home.css';
import TopBar from "../navigation/TopBar.js";
import DisplayProduct from "../body/home/displayArrival.js";
import SliderPresenter from "../components/sliderPresenter";
import {MyContextProvider} from "../context.js";

function Home() {
  return (
    <div>
      <MyContextProvider>
        <TopBar />
        <SliderPresenter  />
        <DisplayProduct />
      </MyContextProvider>
    </div>
  );
}

export default Home;
