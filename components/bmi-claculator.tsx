'use client';
import { useState, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BmiCalculator = () => {
  interface BmiResult {
    bmi: string;
    category: string;
  }
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>('');
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };
  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError('Please enter both height and weight');
      return;
    }
    const heightInMeter = parseFloat(height) / 100;
    if (heightInMeter <= 0) {
      setError('Height must be a positive number');
      return;
    }
    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError('Weiht must be a positive number');
      return;
    }
    const bmiValue = weightInKg / (heightInMeter * heightInMeter);
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Normal';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    setResult({ bmi: bmiValue.toFixed(1), category });
    setError('');
  };
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{
        background: `linear-gradient(135deg, #f88c9a, #f22b7e, #c2185b, #8b0a50)`,
      }}
    >
      <Card className="w-full max-w-md mx-auto rounded-3xl opacity-90">
        <CardHeader>
          <CardTitle className="text-center pb-3">BMI Calculator</CardTitle>
          <CardDescription className="text-center">
            Enter your Height and Weight to calculate your BMI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="label">Height (cm)</Label>
            <Input
              placeholder="Enter your Height"
              id="height"
              type="number"
              value={height}
              onChange={handleHeightChange}
              className="rounded-2xl"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="label">Weight (kg)</Label>
            <Input
              placeholder="Enter your Weight"
              id="weight"
              type="number"
              value={weight}
              onChange={handleWeightChange}
              className="rounded-2xl"
            />
          </div>
          <Button onClick={calculateBmi} className="bg-red-500 rounded-2xl">
            Calculate
          </Button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {result && (
            <div className="grid gap-2">
              <div className="text-center text-3xl font-bold text-red-500">
                {' '}
                Result
              </div>
              <div className="text-center text-2xl font-bold">{result.bmi}</div>
              <div className="text-center text-muted-foreground">
                {result.category}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BmiCalculator;
