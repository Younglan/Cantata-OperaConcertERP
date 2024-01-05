import PerformanceList from "./PerformanceList";
import AllTimeList from "../performTime/AllTimeList";

const PerformAdminMenu = (props) => {
    const listType = props.ListType || '1'; 
    return(
        <div>
            {listType===1 && <PerformanceList/>}
            {listType===2 && <AllTimeList/>}
            
        </div>
    );
}
export default PerformAdminMenu;