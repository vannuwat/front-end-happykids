import TopBar from "../navigation/TopBar.js";
import {ShowAllProduct} from "../body/shop/product";
import {MyContextProvider} from "../context.js";


function Shop() {
    return (
      <div>
        <MyContextProvider>
            <TopBar />
            <ShowAllProduct />
        </MyContextProvider>
      </div>
    );
  }

export default Shop;