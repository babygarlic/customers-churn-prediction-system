import React, { useState, useEffect } from 'react';
import { ChevronRight, Calculator } from 'lucide-react';
import { ChurnPredictionData, PredictionResult } from '../types';
import { predictChurn } from '../utils/churnPredictor';
import { useAuth } from '../context/AuthContext';
interface ChurnPredictionFormProps {
  onPredictionComplete: (result: PredictionResult) => void;
  selectedModel: string;
}

export const ChurnPredictionForm: React.FC<ChurnPredictionFormProps> = ({ onPredictionComplete,selectedModel }) => {
  const user  = useAuth()
  const token = user?.user?.access_token
  const [formData, setFormData] = useState<ChurnPredictionData>({
    gender: 'Male',
    SeniorCitizen: 0,
    Partner: 'Yes',
    Dependents: 'No',
    tenure: 12,
    PhoneService: 'Yes',
    MultipleLines: 'Yes',
    InternetService: 'Fiber optic',
    OnlineSecurity: 'Yes',
    OnlineBackup: 'No',
    DeviceProtection: 'Yes',
    TechSupport: 'No',
    StreamingTV: 'Yes',
    StreamingMovies: 'No',
    Contract: 'Month-to-month',
    PaperlessBilling: 'Yes',
    PaymentMethod: 'Electronic check',
    MonthlyCharges: 70.5,
    TotalCharges: '850.0',
    Created_by: user.user?.username|| 'unknown',
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Si mulate API call

    const result = await predictChurn(formData, selectedModel,token);
    console.log(result)
    onPredictionComplete(result);
    setIsLoading(false);
  };

  const handleChange = (field: keyof ChurnPredictionData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getInternetDependentOptions = (hasInternet: boolean) => {
    if (!hasInternet) {
      return [{ value: 'No internet service', label: 'No internet service' }];
    }
    return [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' }
    ];
  };

  const getPhoneDependentOptions = (hasPhone: boolean) => {
    if (!hasPhone) {
      return [{ value: 'No phone service', label: 'No phone service' }];
    }
    return [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' }
    ];
  };

  const hasInternet = formData.InternetService !== 'No';
  const hasPhone = formData.PhoneService === 'Yes';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Calculator className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900">Customer Churn Prediction</h2>
        </div>
        <p className="text-gray-600 mt-2">Enter customer data to predict churn probability (19 data points)</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Demographics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Demographics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senior Citizen</label>
              <select
                value={formData.SeniorCitizen}
                onChange={(e) => handleChange('SeniorCitizen', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partner</label>
              <select
                value={formData.Partner}
                onChange={(e) => handleChange('Partner', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dependents</label>
              <select
                value={formData.Dependents}
                onChange={(e) => handleChange('Dependents', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (months)</label>
              <input
                type="number"
                value={formData.tenure}
                onChange={(e) => handleChange('tenure', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract</label>
              <select
                value={formData.Contract}
                onChange={(e) => handleChange('Contract', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Month-to-month">Month-to-month</option>
                <option value="One year">One year</option>
                <option value="Two year">Two year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paperless Billing</label>
              <select
                value={formData.PaperlessBilling}
                onChange={(e) => handleChange('PaperlessBilling', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={formData.PaymentMethod}
                onChange={(e) => handleChange('PaymentMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Electronic check">Electronic check</option>
                <option value="Mailed check">Mailed check</option>
                <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                <option value="Credit card (automatic)">Credit card (automatic)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Charges ($)</label>
              <input
                type="number"
                value={formData.MonthlyCharges}
                onChange={(e) => handleChange('MonthlyCharges', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Charges ($)</label>
              <input
                type="number"
                value={formData.TotalCharges}
                onChange={(e) => handleChange('TotalCharges', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 850.0"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone Services */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Phone Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Service</label>
              <select
                value={formData.PhoneService}
                onChange={(e) => handleChange('PhoneService', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Multiple Lines</label>
              <select
                value={formData.MultipleLines}
                onChange={(e) => handleChange('MultipleLines', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {getPhoneDependentOptions(hasPhone).map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Internet Services */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Internet Services</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Internet Service</label>
              <select
                value={formData.InternetService}
                onChange={(e) => handleChange('InternetService', e.target.value)}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="DSL">DSL</option>
                <option value="Fiber optic">Fiber optic</option>
                <option value="No">No</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Online Security</label>
                <select
                  value={formData.OnlineSecurity}
                  onChange={(e) => handleChange('OnlineSecurity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {getInternetDependentOptions(hasInternet).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Online Backup</label>
                <select
                  value={formData.OnlineBackup}
                  onChange={(e) => handleChange('OnlineBackup', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {getInternetDependentOptions(hasInternet).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device Protection</label>
                <select
                  value={formData.DeviceProtection}
                  onChange={(e) => handleChange('DeviceProtection', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {getInternetDependentOptions(hasInternet).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tech Support</label>
                <select
                  value={formData.TechSupport}
                  onChange={(e) => handleChange('TechSupport', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {getInternetDependentOptions(hasInternet).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Streaming TV</label>
                <select
                  value={formData.StreamingTV}
                  onChange={(e) => handleChange('StreamingTV', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {getInternetDependentOptions(hasInternet).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Streaming Movies</label>
                <select
                  value={formData.StreamingMovies}
                  onChange={(e) => handleChange('StreamingMovies', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {getInternetDependentOptions(hasInternet).map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Predict Churn</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};