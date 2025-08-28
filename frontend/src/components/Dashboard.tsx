import React, { useState, useEffect, useMemo } from 'react';
import { LogOut, TrendingDown, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChurnPredictionForm } from './ChurnPredictionForm';
import { PredictionResult } from './PredictionResult';
import { PredictionResult as PredictionResultType } from '../types';
import { fetchModelsAPI } from '../apis'; // Import the API function

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [models, setModels] = useState<{id: string, model_name: string, accuracy: number ,description:string}[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const token = user?.access_token || '';

  console.log(selectedModel)
  //use memo to get selected model description
  const selectedModelDescription = useMemo(() => {
    const model = models.find(m => m.id === selectedModel);
    return model ? model.description : '';  
  }, [selectedModel, models]);

  // use meme to get selcted model accuracy
  const selectedModelAccuracy = useMemo(() => {
    const model = models.find(m => m.id === selectedModel);
    return model ? model.accuracy : null;
  }, [selectedModel, models]);


  useEffect(() => {
    fetchModelsAPI(token).then(data => {
      setModels(data);
      if (data.length > 0) {
        setSelectedModel(data[0].id); // Set default selected model
      }
    },);
}, []);

  const handlePredictionComplete = (result: PredictionResultType) => {
    setPrediction(result);
    setShowForm(false);
  };

  const handleNewPrediction = () => {
    setPrediction(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ChurnPredict AI</h1>
                <p className="text-sm text-gray-600">Our advanced machine learning model analyzes 19 key data points to predict churn probability.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div><Users className="w-6 h-6 text-gray-600 mx-auto" /> </div>
                
                <p className="text-sm font-medium text-gray-900">Welcome, {user?.username}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Model To Predictions</label>
                <select 
                name=""
                id="modelSelect"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                   <option value="">-- Select model --</option>
                      {models.map((model) => (
                    <option key={model.id} value={model.id}>
                          {model.model_name}
                    </option>
        ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Descripton Model</p>
                <p className="text-sm font-bold">{selectedModelDescription}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                <p className="text-4xl font-bold text-green-600">{selectedModelAccuracy}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {showForm ? (
              <ChurnPredictionForm 
              selectedModel={selectedModel}
              onPredictionComplete={handlePredictionComplete}  />
            ) : (
              <PredictionResult 
                prediction={prediction!} 
                onNewPrediction={handleNewPrediction}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Enter Customer Data</p>
                    <p className="text-sm text-gray-600">Input comprehensive customer information including demographics, usage patterns, and engagement metrics.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">AI Analysis</p>
                    <p className="text-sm text-gray-600">Our advanced machine learning model analyzes 20+ data points to predict churn probability.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Get Insights</p>
                    <p className="text-sm text-gray-600">Receive detailed predictions with actionable recommendations to reduce churn risk.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};