// src/components/progress/ProgressCharts.jsx
import React, { useState, useEffect } from 'react';

const ProgressCharts = ({ workouts, weightData }) => {
  const [chartType, setChartType] = useState('weight');
  const [timeRange, setTimeRange] = useState('30days');
  const [chart, setChart] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Filter data by time range
  const filterDataByTimeRange = (data, dateField) => {
    const today = new Date();
    const pastDate = new Date();
    
    switch(timeRange) {
      case '7days':
        pastDate.setDate(today.getDate() - 7);
        break;
      case '30days':
        pastDate.setDate(today.getDate() - 30);
        break;
      case '90days':
        pastDate.setDate(today.getDate() - 90);
        break;
      case '1year':
        pastDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'all':
      default:
        // Return all data
        return data;
    }
    
    return data.filter(item => new Date(item[dateField]) >= pastDate);
  };

  // Prepare chart data based on chart type
  useEffect(() => {
    const prepareChartData = () => {
      if (chartType === 'weight') {
        const filteredData = filterDataByTimeRange(weightData, 'date')
          .sort((a, b) => new Date(a.date) - new Date(b.date));
          
        if (filteredData.length === 0) return null;

        return {
          labels: filteredData.map(entry => new Date(entry.date).toLocaleDateString()),
          values: filteredData.map(entry => entry.weight),
          yLabel: 'Weight (lbs)',
          color: 'blue'
        };
      } 
      else if (chartType === 'workouts') {
        // Group workouts by date
        const filteredWorkouts = filterDataByTimeRange(workouts, 'date');
        const workoutsByDate = {};
        
        filteredWorkouts.forEach(workout => {
          const date = new Date(workout.date).toLocaleDateString();
          if (!workoutsByDate[date]) {
            workoutsByDate[date] = 0;
          }
          workoutsByDate[date]++;
        });
        
        // Convert to arrays for charting
        const dates = Object.keys(workoutsByDate).sort((a, b) => new Date(a) - new Date(b));
        
        return {
          labels: dates,
          values: dates.map(date => workoutsByDate[date]),
          yLabel: 'Workout Count',
          color: 'green'
        };
      }
      else if (chartType === 'duration') {
        // Group workout duration by date
        const filteredWorkouts = filterDataByTimeRange(workouts, 'date');
        const durationByDate = {};
        
        filteredWorkouts.forEach(workout => {
          const date = new Date(workout.date).toLocaleDateString();
          if (!durationByDate[date]) {
            durationByDate[date] = 0;
          }
          durationByDate[date] += workout.duration;
        });
        
        // Convert to arrays for charting
        const dates = Object.keys(durationByDate).sort((a, b) => new Date(a) - new Date(b));
        
        return {
          labels: dates,
          values: dates.map(date => durationByDate[date]/60), // Convert minutes to hours
          yLabel: 'Duration (hours)',
          color: 'purple'
        };
      }
      else if (chartType === 'calories') {
        // Group workout calories by date
        const filteredWorkouts = filterDataByTimeRange(workouts, 'date');
        const caloriesByDate = {};
        
        filteredWorkouts.forEach(workout => {
          const date = new Date(workout.date).toLocaleDateString();
          if (!caloriesByDate[date]) {
            caloriesByDate[date] = 0;
          }
          caloriesByDate[date] += workout.calories;
        });
        
        // Convert to arrays for charting
        const dates = Object.keys(caloriesByDate).sort((a, b) => new Date(a) - new Date(b));
        
        return {
          labels: dates,
          values: dates.map(date => caloriesByDate[date]),
          yLabel: 'Calories Burned',
          color: 'red'
        };
      }
      
      return null;
    };

    const data = prepareChartData();
    setChartData(data);
  }, [chartType, timeRange, workouts, weightData]);

  // Draw the chart using SVG
  useEffect(() => {
    if (!chartData) return;
    
    // SVG chart rendering
    const renderSVGChart = () => {
      const margin = { top: 20, right: 30, bottom: 40, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
      
      const labels = chartData.labels;
      const values = chartData.values;
      
      // Calculate scales
      const xScale = width / Math.max(labels.length - 1, 1);
      const maxValue = Math.max(...values) * 1.1; // Add 10% padding to the top
      
      // Generate path for the line chart
      let pathD = '';
      values.forEach((value, index) => {
        const x = index * xScale;
        const y = height - (value / maxValue * height);
        if (index === 0) {
          pathD += `M ${x},${y}`;
        } else {
          pathD += ` L ${x},${y}`;
        }
      });
      
      // Generate tick marks for y-axis
      const yTicks = [];
      const numTicks = 5;
      for (let i = 0; i <= numTicks; i++) {
        const value = maxValue * (i / numTicks);
        const y = height - (value / maxValue * height);
        yTicks.push({ value: Math.round(value * 10) / 10, y });
      }
      
      // Generate the SVG
      return (
        <svg width="100%" height="400" viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} preserveAspectRatio="xMidYMid meet">
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Y-axis */}
            <line x1="0" y1="0" x2="0" y2={height} stroke="#ccc" />
            
            {/* Y-axis label */}
            <text transform={`translate(-40,${height/2}) rotate(-90)`} textAnchor="middle" fontSize="12">
              {chartData.yLabel}
            </text>
            
            {/* Y-axis ticks */}
            {yTicks.map((tick, i) => (
              <g key={i}>
                <line x1="-5" y1={tick.y} x2="0" y2={tick.y} stroke="#ccc" />
                <text x="-10" y={tick.y + 4} textAnchor="end" fontSize="10">
                  {tick.value}
                </text>
                <line x1="0" y1={tick.y} x2={width} y2={tick.y} stroke="#eee" strokeDasharray="2,2" />
              </g>
            ))}
            
            {/* X-axis */}
            <line x1="0" y1={height} x2={width} y2={height} stroke="#ccc" />
            
            {/* X-axis ticks and labels */}
            {labels.map((label, i) => {
              // Show fewer labels if there are many points
              const showLabel = labels.length <= 10 || i % Math.ceil(labels.length / 10) === 0;
              
              return (
                <g key={i} transform={`translate(${i * xScale},0)`}>
                  <line x1="0" y1={height} x2="0" y2={height + 5} stroke="#ccc" />
                  {showLabel && (
                    <text 
                      x="0" 
                      y={height + 20} 
                      textAnchor="middle" 
                      fontSize="10"
                      transform={`rotate(45 0 ${height + 20})`}
                    >
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Data line */}
            <path d={pathD} fill="none" stroke={chartData.color} strokeWidth="2" />
            
            {/* Data points */}
            {values.map((value, i) => (
              <circle 
                key={i} 
                cx={i * xScale} 
                cy={height - (value / maxValue * height)} 
                r="4" 
                fill="white" 
                stroke={chartData.color} 
                strokeWidth="2" 
              />
            ))}
          </g>
        </svg>
      );
    };
    
    setChart(renderSVGChart());
  }, [chartData]);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Progress Tracking</h2>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-1.5 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="weight">Weight</option>
            <option value="workouts">Workouts Frequency</option>
            <option value="duration">Workout Duration</option>
            <option value="calories">Calories Burned</option>
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full min-h-[400px] flex items-center justify-center">
          {chartData && chartData.values.length > 0 ? (
            <div className="w-full h-96">
              {chart}
            </div>
          ) : (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="mt-2 text-gray-500">No data available for the selected period.</p>
              <p className="text-sm text-gray-500">
                {chartType === 'weight' 
                  ? 'Start tracking your weight to see progress.'
                  : 'Log workouts to track your progress over time.'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {chartData && chartData.values.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">First</p>
              <p className="text-lg font-semibold">
                {chartData.values[0].toFixed(1)}
                {chartType === 'weight' && ' lbs'}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Latest</p>
              <p className="text-lg font-semibold">
                {chartData.values[chartData.values.length - 1].toFixed(1)}
                {chartType === 'weight' && ' lbs'}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Change</p>
              {(() => {
                const first = chartData.values[0];
                const last = chartData.values[chartData.values.length - 1];
                const change = last - first;
                const isPositive = change > 0;
                const color = chartType === 'weight' ? (isPositive ? 'text-red-600' : 'text-green-600') : (isPositive ? 'text-green-600' : 'text-red-600');
                
                return (
                  <p className={`text-lg font-semibold ${color}`}>
                    {change > 0 ? '+' : ''}{change.toFixed(1)}
                    {chartType === 'weight' && ' lbs'}
                  </p>
                );
              })()}
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Average</p>
              <p className="text-lg font-semibold">
                {(chartData.values.reduce((a, b) => a + b, 0) / chartData.values.length).toFixed(1)}
                {chartType === 'weight' && ' lbs'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCharts;