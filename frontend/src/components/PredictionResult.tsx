import React from 'react';
import { AlertTriangle, CheckCircle, Target, TrendingUp, RotateCcw } from 'lucide-react';
import { PredictionResult as PredictionResultType } from '../types';

interface PredictionResultProps {
  prediction: PredictionResultType;
  onNewPrediction: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, onNewPrediction }) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return <CheckCircle className="w-6 h-6" />;
      case 'Medium': return <Target className="w-6 h-6" />;
      case 'High': return <AlertTriangle className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const getProgressBarColor = (probability: number) => {
    if (probability < 30) return 'from-green-400 to-green-600';
    if (probability < 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Churn Prediction Results</h2>
            <button
              onClick={onNewPrediction}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Prediction</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Churn Probability */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Churn Probability</h3>
              <span className="text-3xl font-bold text-gray-900">{Number((prediction.Probability*100)).toFixed(2)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getProgressBarColor(Number(prediction.Probability.toFixed(3))*100)} transition-all duration-1000 ease-out`}
                style={{ width: `${Number(prediction.Probability.toFixed(3))*100}%` }}
              ></div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="mb-8">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${getRiskColor(prediction.RiskLevel)}`}>
              {getRiskIcon(prediction.RiskLevel)}
              <span className="font-medium">{prediction.RiskLevel}</span>
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Key Risk Factors</span>
            </h3>
            
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Recommendations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              </div>
          </div>
        </div>
      </div>

      {/* Action Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Next Steps</h3>
        <p className="text-gray-700 mb-4">
          Based on the analysis, this customer has a <strong>{prediction.RiskLevel.toLowerCase()}</strong> of churning. 
          {prediction.RiskLevel === 'High' && ' Immediate action is recommended to retain this customer.'}
          {prediction.RiskLevel === 'Medium' && ' Monitor closely and consider preventive measures.'}
          {prediction.RiskLevel === 'Low' && ' Continue with standard retention strategies.'}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Customer Analytics
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            AI Prediction
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Actionable Insights
          </span>
        </div>
      </div>
    </div>
  );
};