import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chart from '../../components/Chart';
import SelectBox from '../../components/SelectBox';
import { IState } from '../../store';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { MatriceTypes } from '../../utils';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

//Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 400
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    backgroundColor: "white"
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));


// Component Props
const MenuProps = {
  PaperProps: {
    style: {
      width: 300
    }
  }
};

function getStyles(metric: string, metricValue: string[], theme: Theme) {
  return {
    fontWeight:
      metricValue.indexOf(metric) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

//Calling getMetrics Query and Dispactching action to get data via selector

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;

const getMetricList = (state: IState) => {
  const { metrics } = state.dashboard;
  return metrics;
};

export default () => {
  return (
    <Provider value={client}>
      <Dashboard />
    </Provider>
  );
};

const Dashboard = () => {

  // Variables
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const listOfMetrics = useSelector(getMetricList);
  const [metricValue, setMetricValue] = React.useState<string[]>([]);

  const [result] = useQuery({
    query,

  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricDataReceivedApiError({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricDataReceived(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  const handleChange = (values: string | string[]) => {
    setMetricValue(Array.isArray(values) ? values : [values]);
  };

  //View (Select Dropdown)
  return <>
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
      <SelectBox
        label="Metric Name"
        placeholder="Select a metric"
        onChange={handleChange}
        options={Object.entries(MatriceTypes).map(([value, label]) => ({ value, label }))}
        multiple
      />
    </FormControl>

    {metricValue.length > 0 && <Chart metricValue={metricValue} />}
  </>;
};

