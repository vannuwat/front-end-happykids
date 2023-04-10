// import './home.css';
import TopBar from "../navigation/TopBar.js";
import DisplayProduct from "../body/home/displayArrival.js";
import SliderPresenter from "../components/sliderPresenter";
import {MyContextProvider} from "../context.js";
import BottomContact from "../components/bottomContact.js";
function Home() {
  return (
    <div>
      <MyContextProvider>
        <TopBar />
        <SliderPresenter  />
        <DisplayProduct />
        <BottomContact />
      </MyContextProvider>
    </div>
  );
}

export default Home;
