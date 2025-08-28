import axios from "axios";
import { API_BASE_URL } from "../types/key";
export const fetchModelsAPI = async(token:string)=>{
      const response = await axios.get(`${API_BASE_URL}/models/get_models`,
        { headers: {    
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    }
         });
        return response.data;

    }

