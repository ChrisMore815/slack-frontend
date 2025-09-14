import api from "../libs/axios";
import { useQuery } from "../contexts/QueryProvider";

const useUsers = () => {
    const { isLoading, data } = useQuery({
        queryKey: 'user',
        queryFn: () => {
            return api.get(`${process.env.REACT_APP_BASE_URL}/user`);
        }
    });

    return {
        isLoading,
        users: data || [],
    }
}

export default useUsers;
