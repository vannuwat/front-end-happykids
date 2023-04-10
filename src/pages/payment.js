import TopBar from "../navigation/TopBar";
import {MyContextProvider} from "../context";
import Transaction from "../body/payment/transaction";

function PaymentDetail() {

    return (
      <div>
        <MyContextProvider>
            <TopBar />
            <Transaction />
        </MyContextProvider>
      </div>

    );
  }

export default PaymentDetail;