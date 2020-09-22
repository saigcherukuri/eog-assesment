import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Feature/Dashboard/reducer';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../../store';
import LinearProgress from '@material-ui/core/LinearProgress';
import Cards from '../Cards';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

//Reducer
const getMeasurementList = (state: IState) => {
    const { measurements } = state.dashboard;
    return measurements;
};

export default (props: { metricValue: any }) => {

     //selector
    const client = createClient({
        url: 'https://react.eogresources.com/graphql',
    });

    const query = `
      query {
        getMultipleMeasurements
        (input: 
            [
                {metricName: "flareTemp"}, 
                {metricName: "waterTemp"}, 
                {metricName: "casingPressure"}, 
                {metricName: "oilTemp"},
                {metricName: "tubingPressure"},
                {metricName: "injValveOpen"}
            ]) {
          metric
          measurements {
            metric
            at
            value
            unit
          }
        }
      }
      `
    const dispatch = useDispatch();
    const listOfMeasurements = useSelector(getMeasurementList);
    const finalList = listOfMeasurements.map((x: any) => x.measurements.slice(0, 1000));

    const [result] = useQuery({
        query
    });

    //Action
    const { fetching, data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch(actions.metricDataReceivedApiError({ error: error.message }));
            return;
        }
        if (!data) return;
        dispatch(actions.measurementsDataReceived(data));
    }, [dispatch, data, error]);

    if (fetching) return <LinearProgress />;

    let selectiveList: any = [];
    props && props.metricValue && props.metricValue.length > 0 && props.metricValue.map((element: any) => {
        let key: any = [];
        finalList && finalList.map(secondElement => {
            secondElement.map((thirdElement: any) => {
                if (thirdElement.metric == element) key.push(thirdElement);
            })
        });
        selectiveList.push(key);
    });

    const ComponentProps = {
        metricValue:props.metricValue,
        selectiveListData: selectiveList
    }

    return (
        <Provider value={client}>
            {props.metricValue.length > 0 && <Cards {...ComponentProps}/>}

            <LineChart width={1000} height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="at" allowDuplicatedCategory={false} />
                <YAxis dataKey="value" />
                <Tooltip />
                <Legend />
                {selectiveList.map((s: any) => (
                    <Line 
                        dataKey="value" 
                        data={s} 
                        name={s.metric} 
                        key={s.metric}
                        stroke={
                            "#" + (((1 << 24) * Math.random()) | 0).toString(16)
                          } />
                ))}
            </LineChart>
        </Provider>
    );

}
