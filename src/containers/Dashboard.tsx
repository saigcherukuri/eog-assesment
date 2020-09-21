import React, {Fragment} from 'react';
import SelectBox  from './../components/SelectBox';
import { MatriceTypes } from '../utils';
import Chart from './../components/Chart';

const Matrice = () => {
  const [selection, setSelection] = React.useState<string[]>([]);
  const onMetricChange = (values: string | string[]) => {
    setSelection(Array.isArray(values) ? values : [values]);
  };

  return (
    <Fragment>
      <SelectBox
        label="Metric Name"
        placeholder="Select a metric"
        onChange={onMetricChange}
        options={Object.entries(MatriceTypes).map(([value, label]) => ({ value, label }))}
        multiple
      />
      <Chart options={selection} />
    </Fragment>
  );
};
export default Matrice;