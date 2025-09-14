"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, Brain, TrendingUp } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
}

interface TrainingState {
  isTraining: boolean;
  epoch: number;
  loss: number;
  weight: number;
  bias: number;
  learningRate: number;
  speed: number;
  datasetSize: number;
}

interface TrainingHistory {
  epochs: number[];
  losses: number[];
}

const generateDataset = (size: number): DataPoint[] => {
  const data: DataPoint[] = [];
  const trueWeight = 1.5;
  const trueBias = 0.3;
  
  for (let i = 0; i < size; i++) {
    const x = (Math.random() - 0.5) * 4; // x between -2 and 2
    const noise = (Math.random() - 0.5) * 0.4; // small noise
    const y = trueWeight * x + trueBias + noise;
    data.push({ x, y });
  }
  
  return data;
};

const computeLoss = (data: DataPoint[], weight: number, bias: number): number => {
  let totalLoss = 0;
  for (const point of data) {
    const prediction = weight * point.x + bias;
    const error = prediction - point.y;
    totalLoss += error * error;
  }
  return totalLoss / data.length;
};

const updateModel = (
  data: DataPoint[],
  weight: number,
  bias: number,
  learningRate: number
): { weight: number; bias: number } => {
  let weightGradient = 0;
  let biasGradient = 0;
  
  for (const point of data) {
    const prediction = weight * point.x + bias;
    const error = prediction - point.y;
    weightGradient += 2 * error * point.x;
    biasGradient += 2 * error;
  }
  
  weightGradient /= data.length;
  biasGradient /= data.length;
  
  return {
    weight: weight - learningRate * weightGradient,
    bias: bias - learningRate * biasGradient
  };
};

const drawScatterPlot = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  weight: number,
  bias: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Set up coordinate system
  const padding = 60;
  const plotWidth = canvasWidth - 2 * padding;
  const plotHeight = canvasHeight - 2 * padding;
  
  // Data bounds
  const xRange = 4; // -2 to 2
  const yRange = 4; // -2 to 2
  
  // Draw axes
  ctx.strokeStyle = '#3A3A3A';
  ctx.lineWidth = 1;
  ctx.beginPath();
  // X-axis
  ctx.moveTo(padding, canvasHeight - padding);
  ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
  // Y-axis
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvasHeight - padding);
  ctx.stroke();
  
  // Draw grid
  ctx.strokeStyle = '#2A2A2A';
  ctx.lineWidth = 0.5;
  for (let i = 1; i < 5; i++) {
    const x = padding + (i / 4) * plotWidth;
    const y = padding + (i / 4) * plotHeight;
    
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, canvasHeight - padding);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(canvasWidth - padding, y);
    ctx.stroke();
  }
  
  // Draw data points
  ctx.fillStyle = '#00D4FF';
  for (const point of data) {
    const x = padding + ((point.x + 2) / 4) * plotWidth;
    const y = canvasHeight - padding - ((point.y + 2) / 4) * plotHeight;
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Draw regression line with gradient
  const gradient = ctx.createLinearGradient(padding, 0, canvasWidth - padding, 0);
  gradient.addColorStop(0, '#00D4FF');
  gradient.addColorStop(0.5, '#FF0099');
  gradient.addColorStop(1, '#00D4FF');
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  
  ctx.beginPath();
  const x1 = -2;
  const y1 = weight * x1 + bias;
  const x2 = 2;
  const y2 = weight * x2 + bias;
  
  const canvasX1 = padding + ((x1 + 2) / 4) * plotWidth;
  const canvasY1 = canvasHeight - padding - ((y1 + 2) / 4) * plotHeight;
  const canvasX2 = padding + ((x2 + 2) / 4) * plotWidth;
  const canvasY2 = canvasHeight - padding - ((y2 + 2) / 4) * plotHeight;
  
  ctx.moveTo(canvasX1, canvasY1);
  ctx.lineTo(canvasX2, canvasY2);
  ctx.stroke();
  
  // Draw labels
  ctx.fillStyle = '#A1A1A1';
  ctx.font = '12px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Training Data & Regression Line', canvasWidth / 2, 30);
  
  // Axis labels
  ctx.save();
  ctx.translate(20, canvasHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Y', 0, 0);
  ctx.restore();
  
  ctx.fillText('X', canvasWidth / 2, canvasHeight - 20);
};

const drawLossChart = (
  ctx: CanvasRenderingContext2D,
  history: TrainingHistory,
  canvasWidth: number,
  canvasHeight: number
) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  if (history.losses.length < 2) return;
  
  const padding = 60;
  const plotWidth = canvasWidth - 2 * padding;
  const plotHeight = canvasHeight - 2 * padding;
  
  // Find data bounds
  const maxLoss = Math.max(...history.losses);
  const minLoss = Math.min(...history.losses);
  const maxEpoch = Math.max(...history.epochs);
  
  // Draw axes
  ctx.strokeStyle = '#3A3A3A';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, canvasHeight - padding);
  ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvasHeight - padding);
  ctx.stroke();
  
  // Draw loss curve
  const gradient = ctx.createLinearGradient(0, padding, 0, canvasHeight - padding);
  gradient.addColorStop(0, '#FF0099');
  gradient.addColorStop(1, '#00D4FF');
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  for (let i = 0; i < history.losses.length; i++) {
    const x = padding + (history.epochs[i] / maxEpoch) * plotWidth;
    const y = canvasHeight - padding - ((history.losses[i] - minLoss) / (maxLoss - minLoss)) * plotHeight;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  
  // Labels
  ctx.fillStyle = '#A1A1A1';
  ctx.font = '12px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Training Loss Over Time', canvasWidth / 2, 30);
  
  ctx.save();
  ctx.translate(20, canvasHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Loss', 0, 0);
  ctx.restore();
  
  ctx.fillText('Epoch', canvasWidth / 2, canvasHeight - 20);
};

const MLTrainingDemo: React.FC = () => {
  const scatterCanvasRef = useRef<HTMLCanvasElement>(null);
  const lossCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  const [trainingState, setTrainingState] = useState<TrainingState>({
    isTraining: false,
    epoch: 0,
    loss: 0,
    weight: Math.random() - 0.5,
    bias: Math.random() - 0.5,
    learningRate: 0.01,
    speed: 1,
    datasetSize: 50
  });
  
  const [dataset, setDataset] = useState<DataPoint[]>([]);
  const [trainingHistory, setTrainingHistory] = useState<TrainingHistory>({
    epochs: [],
    losses: []
  });

  useEffect(() => {
    const newDataset = generateDataset(trainingState.datasetSize);
    setDataset(newDataset);
    const initialLoss = computeLoss(newDataset, trainingState.weight, trainingState.bias);
    setTrainingState(prev => ({ ...prev, loss: initialLoss }));
  }, [trainingState.datasetSize]);
  
  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      if (!trainingState.isTraining || dataset.length === 0) return;
      
      const elapsed = currentTime - lastTime;
      // Faster base interval for more responsive updates, scaled by speed
      const updateInterval = Math.max(50, 150 / trainingState.speed); // Minimum 50ms for responsiveness
      
      if (elapsed >= updateInterval) {
        const { weight: newWeight, bias: newBias } = updateModel(
          dataset,
          trainingState.weight,
          trainingState.bias,
          trainingState.learningRate
        );
        
        const newLoss = computeLoss(dataset, newWeight, newBias);
        const newEpoch = trainingState.epoch + 1;
        
        // Update state in a single setState call for efficiency
        setTrainingState(prev => ({
          ...prev,
          epoch: newEpoch,
          weight: newWeight,
          bias: newBias,
          loss: newLoss
        }));
        
        // Update training history immediately on every epoch
        setTrainingHistory(prev => ({
          epochs: [...prev.epochs, newEpoch],
          losses: [...prev.losses, newLoss]
        }));
        
        lastTime = currentTime;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (trainingState.isTraining && dataset.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trainingState.isTraining, trainingState.speed, trainingState.learningRate, dataset, trainingState.weight, trainingState.bias, trainingState.epoch]);
  
  useEffect(() => {
    const scatterCanvas = scatterCanvasRef.current;
    const lossCanvas = lossCanvasRef.current;
    
    if (scatterCanvas && dataset.length > 0) {
      const ctx = scatterCanvas.getContext('2d');
      if (ctx) {
        drawScatterPlot(
          ctx,
          dataset,
          trainingState.weight,
          trainingState.bias,
          scatterCanvas.width,
          scatterCanvas.height
        );
      }
    }
    
    if (lossCanvas && trainingHistory.losses.length > 0) {
      const ctx = lossCanvas.getContext('2d');
      if (ctx) {
        drawLossChart(
          ctx,
          trainingHistory,
          lossCanvas.width,
          lossCanvas.height
        );
      }
    }
  }, [dataset, trainingState.weight, trainingState.bias, trainingState.epoch, trainingHistory]);
  
  const handleStart = useCallback(() => {
    setTrainingState(prev => ({ ...prev, isTraining: !prev.isTraining }));
  }, []);
  
  const handleReset = useCallback(() => {
    const newWeight = Math.random() - 0.5;
    const newBias = Math.random() - 0.5;
    const newDataset = generateDataset(trainingState.datasetSize);
    
    setDataset(newDataset);
    setTrainingState(prev => ({
      ...prev,
      isTraining: false,
      epoch: 0,
      weight: newWeight,
      bias: newBias,
      loss: computeLoss(newDataset, newWeight, newBias)
    }));
    setTrainingHistory({ epochs: [], losses: [] });
  }, [trainingState.datasetSize]);
  
  const handleSpeedChange = useCallback((value: number[]) => {
    setTrainingState(prev => ({ ...prev, speed: value[0] }));
  }, []);
  
  const handleDatasetSizeChange = useCallback((value: string) => {
    const size = parseInt(value);
    setTrainingState(prev => ({ ...prev, datasetSize: size, isTraining: false }));
  }, []);
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Live ML Training Demo
          </h1>
          <Brain className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive linear regression training. Click "Start" to begin training and watch the model learn in real-time.
        </p>
      </div>
      
      {/* Controls */}
      <Card className="bg-card/50 backdrop-blur-sm border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
            Training Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Controls */}
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleStart}
              className={`min-w-[120px] transition-all duration-300 ${
                trainingState.isTraining 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 shadow-lg' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 shadow-lg'
              }`}
              aria-label={trainingState.isTraining ? "Pause training" : "Start training"}
            >
              {trainingState.isTraining ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground min-w-[120px] shadow-sm"
              aria-label="Reset training"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          
          {/* Parameter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                Live Update Speed: 
                <span className="text-primary font-bold">{trainingState.speed}x</span>
                <span className="text-xs text-muted-foreground">(Real-time streaming)</span>
              </label>
              <Slider
                value={[trainingState.speed]}
                onValueChange={handleSpeedChange}
                min={0.1}
                max={5}
                step={0.1}
                className="w-full"
                aria-label="Training speed"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1x (Slow)</span>
                <span>1x (Default)</span>
                <span>5x (Fast)</span>
              </div>
            </div>
            
            {/* Dataset Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Dataset Size
              </label>
              <Select value={trainingState.datasetSize.toString()} onValueChange={handleDatasetSizeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 points</SelectItem>
                  <SelectItem value="50">50 points (Default)</SelectItem>
                  <SelectItem value="100">100 points</SelectItem>
                  <SelectItem value="200">200 points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background/50 rounded-lg p-3 text-center border border-border/50 shadow-sm">
              <div className="text-sm text-muted-foreground">Epoch</div>
              <div className="text-xl font-semibold text-primary tabular-nums">
                {trainingState.epoch}
              </div>
              <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                trainingState.isTraining ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`} />
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center border border-border/50 shadow-sm">
              <div className="text-sm text-muted-foreground">Loss</div>
              <div className="text-xl font-semibold text-secondary tabular-nums">
                {trainingState.loss.toFixed(4)}
              </div>
              <div className={`text-xs ${
                trainingHistory.losses.length > 1 && 
                trainingState.loss < trainingHistory.losses[trainingHistory.losses.length - 2]
                  ? 'text-green-500' : 'text-muted-foreground'
              }`}>
                {trainingHistory.losses.length > 1 && 
                 trainingState.loss < trainingHistory.losses[trainingHistory.losses.length - 2] 
                 ? '↓ Decreasing' : ''}
              </div>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center border border-border/50 shadow-sm">
              <div className="text-sm text-muted-foreground">Weight</div>
              <div className="text-xl font-semibold tabular-nums">{trainingState.weight.toFixed(3)}</div>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center border border-border/50 shadow-sm">
              <div className="text-sm text-muted-foreground">Bias</div>
              <div className="text-xl font-semibold tabular-nums">{trainingState.bias.toFixed(3)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Live Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Scatter Plot */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Data & Regression Line
              <div className={`w-2 h-2 rounded-full ${
                trainingState.isTraining ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`} />
              <span className="text-xs text-muted-foreground">
                {trainingState.isTraining ? 'Live Updating' : 'Paused'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <canvas
                ref={scatterCanvasRef}
                width={400}
                height={300}
                className="w-full h-auto border border-border rounded-lg bg-background/30 shadow-inner"
                aria-label="Live scatter plot showing training data and current regression line updating in real-time"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Live Loss Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Training Loss
              <div className={`w-2 h-2 rounded-full ${
                trainingState.isTraining ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`} />
              <span className="text-xs text-muted-foreground">
                {trainingState.isTraining ? 'Streaming Live' : 'Paused'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <canvas
                ref={lossCanvasRef}
                width={400}
                height={300}
                className="w-full h-auto border border-border rounded-lg bg-background/30 shadow-inner"
                aria-label="Live line chart showing training loss over epochs, updating every training step"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Status Indicator */}
      <div className="flex flex-col items-center space-y-3">
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
          trainingState.isTraining 
            ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20' 
            : 'bg-muted text-muted-foreground border border-border shadow-sm'
        }`}>
          <div className={`w-3 h-3 rounded-full ${
            trainingState.isTraining ? 'bg-primary animate-pulse shadow-lg shadow-primary/50' : 'bg-muted-foreground'
          }`} />
          <span className="text-sm font-medium">
            {trainingState.isTraining 
              ? `Training live • Epoch ${trainingState.epoch} • Loss: ${trainingState.loss.toFixed(4)}` 
              : 'Training paused • Click Start to begin live updates'}
          </span>
          {trainingState.isTraining && (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-primary/60 rounded animate-pulse" style={{animationDelay: '0ms'}} />
              <div className="w-1 h-4 bg-primary/60 rounded animate-pulse" style={{animationDelay: '150ms'}} />
              <div className="w-1 h-4 bg-primary/60 rounded animate-pulse" style={{animationDelay: '300ms'}} />
            </div>
          )}
        </div>
        
        {/* <p className="text-xs text-muted-foreground text-center max-w-md">
          🎯 Manual control demo: Training only begins when you click "Start". 
          Use "Reset" to clear progress and return to paused state.
        </p> */}
      </div>
    </div>
  );
};

export { MLTrainingDemo };