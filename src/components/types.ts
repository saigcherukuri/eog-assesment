import { IMatriceTypes } from './../utils';

export interface IDatasets {
  label: string;
  fill: boolean;
  lineTension: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: number[];
}
export interface IChartData {
  labels: string[];
  datasets: IDatasets[];
}
export interface IMeasurements {
  at: number;
  value: number;
}
export interface IMultipleMeasurements {
  metric: keyof IMatriceTypes;
  measurements: IMeasurements[];
}
export interface IGetMeasurementsResult {
  data: {
    getMultipleMeasurements: IMultipleMeasurements[];
  };
}

export interface IChartProps {
  options: string[];
}

export interface IState {
    values: string | string[];
    focusedValue: number;
    isFocused: boolean;
    isOpen: boolean;
    typed: string;
  }
  export type IOption = { value: string | number; label: string };
  export type IOptions = IOption[];
  export interface IProps {
    options?: IOptions;
    multiple?: boolean;
    placeholder?: string;
    label?: string | JSX.Element;
    onChange?: (value: string | string[]) => void;
  }
