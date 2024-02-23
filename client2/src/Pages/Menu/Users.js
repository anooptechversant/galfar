import { useEffect } from "react";
import Table from "../../Components/CommonComponents/Table";
import getUsers from "../../Api/usersApi"
import { useDispatch} from "react-redux";
import WorkTypeTable from "../../Components/CommonComponents/WorkTypeTable";
export default function Users() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Menu</h1>
            <WorkTypeTable />
        </div>
    );
}
