import TopBar from "../navigation/TopBar";
import {MyContextProvider} from "../context";
import ItemDetail from "../body/item/itemDetail";
import { useLocation } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sku = searchParams.get('sku');
  
  return (
    <div>
      <MyContextProvider>
          <TopBar />
          <ItemDetail sku={sku}/>
      </MyContextProvider>
    </div>
  );
}

export default ProductDetail;