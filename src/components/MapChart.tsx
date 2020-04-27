import React, { useEffect, useState, memo } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num:number) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

type MapProps = {
  setTooltipContent: (message:string) => void
};

const MapChart = ({ setTooltipContent }:MapProps) => {
  const [data, setData] = React.useState<{[key: string]: []}>({});

  useEffect(() => {
      fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(response => response.json())
      .then(data => {
        // data["Argentina"].forEach(({ date, confirmed, recovered, deaths }) =>
        //   console.log(`${date} active cases: ${confirmed - recovered - deaths}`)
        // );
        let fixedData = {
           ...data,
           "United States of America": data["US"],
           "South Korea": data["Korea, South"]
         }
         delete fixedData["US"]
         delete fixedData["Korea, South"]
         setData(fixedData);
      });
  },[]);


  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }} >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    // most recent day info == last element in array
                    if (data[NAME]) {
                      const currentCountryData = data[NAME].slice(-1)[0];
                      setTooltipContent(`${NAME} —
                                          active cases: ${rounded(currentCountryData['confirmed'] - currentCountryData['recovered'] - currentCountryData['deaths'])}`);
                    }

                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
