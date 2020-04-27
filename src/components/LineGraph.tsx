import React, { useEffect, useState } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line'

type LineProps = {
  selectedCountry: string
}

function getData(): Serie[] {
  return([
                    {
                        id: 'cases',
                        data: [
                            { x: 0, y: 12},
                            { x: 1, y: 9 },
                            { x: 2, y: 15},
                            { x: 3, y: 7 },
                            { x: 4, y: 0 },
                            { x: 5, y: 9 },
                            { x: 6, y: 11},
                        ],
                        color: '#B00',
                    },
                    {
                        id: 'predictions',
                        data: [
                            { x: 0, y: 16},
                            { x: 1, y: 9 },
                            { x: 2, y: 15},
                            { x: 3, y: 7 },
                            { x: 4, y: 7 },
                            { x: 5, y: 9 },
                            { x: 6, y: 11},
                            { x: 7, y: 34 },
                            { x: 8, y: 9 },
                            { x: 9, y: 11},
                        ],
                        color: 'red',
                    }
                  ]);
}






export default function LineGraph(props:LineProps) {
  const [data, setData] = React.useState<Serie[]>([]);

  useEffect(() => {
    const timeSeries: Serie[] = [];
    fetch(`/api/cases/${props.selectedCountry}`).then(res => res.json()).then(data => {
      timeSeries.push(data);
    });
    fetch(`/api/predictcases/${props.selectedCountry}`).then(res => res.json()).then(data => {
      timeSeries.push(data);
    });
    setData(timeSeries);

  }, [props.selectedCountry]);

  return (
    <div
      style={{
          height: 400,
      }}
    >
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
              type: 'time',
              format: '%Y-%m-%d',
              precision: 'day',
          }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: '%b %d',
            tickValues: 'every 31 days',
            legend: 'time scale',
            legendOffset: -12,
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'cases',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  );
}
