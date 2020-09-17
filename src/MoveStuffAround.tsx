import React, { useEffect, useState } from "react";
import Ticker from "react-ticker";
import GridLoader from "react-spinners/GridLoader";
import BarLoader from "react-spinners/BarLoader";


import { callNewsApi, callTickerApi } from "./api/Api";

export default function MoveStuffAround() {
  const [data, setData] = useState<any[]>();
  const [news, setNews] = useState<any[]>();
  const override = `
 
`;

  const setupData = async () => {
    let rawTickerData: any = await callTickerApi();

    const tickerData: any = rawTickerData.map(x => ({
      name: x.exchange,
      change: x.fiftyTwoWeekHighChangePercent,
      avg: x.fiftyDayAverage
    }));

    //SET TICKER DATA
    setData(tickerData);

    let rawNewsData: any = await callNewsApi();

    let prepNews = rawNewsData.map(x => ({
      title: x.title
    }));
    console.log(prepNews);

    //SET NEWS DATA
    setNews(prepNews);
  };
  useEffect(() => {
    setupData();
  }, []);

  

  return (
    <div>
      <div>
        {data ? (
          <Ticker direction={"toRight"} speed={15} offset={0}>
            {({ index }) => (
              <>
                <p style={{ whiteSpace: "nowrap" }}>
                  {data.map((x, index) => (
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        backgroundColor: "green",
                        color: "white",
                        padding: 20
                      }}
                      key={index}
                    >
                      {" "}
                      {x["name"]} {x["avg"]} +++{" "}
                    </span>
                  ))}{" "}
                </p>
              </>
            )}
          </Ticker>
        ) : (
          <div className="sweet-loading">
            <GridLoader css={override} color={"#36D7B7"} loading={true} />
          </div>
        )}
        <Ticker direction={"toLeft"} speed={5} offset={5}>
          {({ index }) => (
            <>
              <h4> Read Latest News from The Stock Exchanges ! </h4>
              <img src="www.my-image-source.com/" alt="" />
            </>
          )}
        </Ticker>
        {news ? (
          <Ticker direction={"toLeft"} speed={8} offset={0}>
            {({ index }) => (
              <>
                <p style={{ whiteSpace: "nowrap" }}>
                  {news.map((x, index) => (
                    <span
                      style={{
                        whiteSpace: "nowrap",
                          fontSize:"2.5em",
                        padding: 20
                      }}
                      key={index}
                    >
                      {" "}
                      {x["title"]} +++{" "}
                    </span>
                  ))}{" "}
                </p>
              </>
            )}
          </Ticker>
        ) : (
          <div className="sweet-loading">
            <BarLoader css={override} color={"#36D7B7"} loading={true} />
          </div>
        )}
      </div>
    </div>
  );
}
