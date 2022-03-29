import UpComingBillPay from "../../components/home/bill/UpComingBillPay";
import UpComingBillReceive from "../../components/home/bill/UpComingBillReceive";
import AlertInventoryQuantity from "../../components/home/inventory/AlertInventoryQuantity";
import WidgetLg from "../../components/home/widgetLg/WidgetLg";
import WidgetSm from "../../components/home/widgetSm/WidgetSm";
import "./home.css";

export default function Home() {
  return (
    <main>
    {/* <main className="home"> */}
      
      <UpComingBillPay/>
      
      <UpComingBillReceive/>

      <AlertInventoryQuantity/>
  
    </main>
  );
}
