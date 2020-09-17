

export const callApiTimeSeriesData = async (symbol: string,KEY:string) => {
    console.log("++from api ++"+symbol)
  let URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${symbol=="IBM"? "demo":KEY}`;
  let response = await fetch(URL);

  if (response.ok) {
    try {
      let json = await response.json();
      let arrayOfData: any = Object.entries(
        json["Time Series (Daily)"]
      ).reverse();

      return arrayOfData;
    } catch (error) {
      alert("ERROR "+error);
      console.log(error)
      return null;
    }
  } else {
    alert("HTTP-Error: " + response.status);
    return null;
  }
};

export const callNewsApi = async () => {
    let response = await fetch(
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/AAPL",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
          "x-rapidapi-key": "22a8eebbdemsh4695c040111e5e6p19d7d2jsn5f3ad753b40f"
        }
      }
    );

    if (response.ok) {
      try {
        let json = await response.json();

        return json.item;
      } catch (error) {
        alert(error);
      }
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  export const callTickerApi = async () => {
    let response = await fetch(
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ga/topgainers?start=0",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
          "x-rapidapi-key": "22a8eebbdemsh4695c040111e5e6p19d7d2jsn5f3ad753b40f"
        }
      }
    );

    if (response.ok) {
      try {
        let json = await response.json();

        return json.quotes;
      } catch (error) {
        alert(error);
        return null;
      }
    } else {
      alert("HTTP-Error: " + response.status);
      return null;
    }
  };
