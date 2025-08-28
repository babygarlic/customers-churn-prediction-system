import { ChurnPredictionData, PredictionResult, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, Content_Type } from '../types/key';
import axios from 'axios';
// call api to get churnProbability
export const predictChurn = async (data: ChurnPredictionData, model_id: string, access_token: string|undefined): Promise<PredictionResult> => {
  
  let data_preprocess = data
  console.log(data_preprocess)
  
  const response = await axios.post(`${API_BASE_URL}/customers-churn/predict-one?model_id=${model_id}`,
       data, // call api chir cần data klhong can model í
    {
      headers: {
        'Content-Type': Content_Type,
        'Authorization': `Bearer ${access_token}`
      }
    } 
  )
  // handle type of response.data
  return response.data as PredictionResult;
}