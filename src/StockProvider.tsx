import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";

import ReactAutocomplete from "react-autocomplete";

import { KEY } from "./api/Credentials";
import { funnelData,suggestedStocks } from "./api/Others";
import { callApiTimeSeriesData } from "./api/Api";

export default function StockProvider() {
  const [data, setData] = useState<any>([]);
  const [symbol, setSymbol] = useState<string>("IBM");
  const [change, setChange] = useState<boolean>(false);

  const setupData = async () => {
    let data: any = await callApiTimeSeriesData(symbol, KEY);
    let extractedData: any = data.map((x, i) => ({
      name: x[0],
      uv: Number(x[1]["1. open"]).toFixed(2)
    }));
    setData(extractedData);
  };

  useEffect(() => {
    setupData();
  }, [change]);

  return (
    <div>
      <div style={{margin:88}}>

    
      Change to another stock
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">
            Stock : {symbol}
          </span>
        </div>

        <ReactAutocomplete
          items={suggestedStocks}
          shouldItemRender={(item, value) =>
            item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          getItemValue={item => item.label}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? "#eee" : "transparent" ,zIndex:77, margin:50}}
            >
              {item.label}
            </div>
          )}
          value={symbol}
          onChange={e => {
            setSymbol(e.target.value);
          }}
          onSelect={value => {
            console.log(value);
            setSymbol(value);
          }}
        />

        <button
          type="button"
          onClick={() => {
            console.log(symbol);
            setChange(!change);
          }}
        >
          Change Stock
        </button>
      </div>
      <hr/>
      </div>
      <div className="row">
        {data && (
          <LineChart
            width={window.innerWidth}
            height={600}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        )}
        <AreaChart
          width={window.innerWidth}
          height={450}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
        <FunnelChart width={500} height={250}>
          <Tooltip />
          <Funnel dataKey="value" data={funnelData} isAnimationActive>
            <LabelList
              position="right"
              fill="#000"
              stroke="none"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </div>
    </div>
  );
}
