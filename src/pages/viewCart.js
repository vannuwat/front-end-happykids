import TopBar from "../navigation/TopBar";
import {MyContextProvider} from "../context";
import ViewCart from "../body/payment/viewCart";

function ViewItemToBuy() {
    return (
      <div>
        <MyContextProvider>
            <TopBar />
            <ViewCart />
        </MyContextProvider>
      </div>
    );
  }

export default ViewItemToBuy;