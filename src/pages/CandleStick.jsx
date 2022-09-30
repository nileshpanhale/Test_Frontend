import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import "./candlestick.css";

function CandleStick() {
  const [stock, setStock] = useState([]);
  const [time, setTime] = useState("1m");
  const [VHL, setVHL] = useState([]);
  const [nor, setNor] = useState();
  let symbol = useSelector((state) => state.coinDBReducer.symbolcreated);
  const [test, setTest] = useState({});
  // console.log("first", symbol);
  const data = [];
  const series = [{ data }];
  const ws = new WebSocket("wss://stream.wazirx.com/stream");

  useEffect(() => {

    ws.addEventListener("open", () => {
      ws.send(
        JSON.stringify({ event: "subscribe", streams: [`${symbol}@kline_${time}`] })
      );
    });

    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      var d = res.data;
      setTest(d);
    };

  }, [symbol]);

  useEffect(() => {
    if (test.s == symbol) {
      setNor({ T: test.T + 19800000, o: test.o, c: test.c, l: test.l, h: test.h, s: test.s });
    }
  }, [test]);

  if (nor?.o !== undefined) {
    data.push({ x: nor.T, y: [nor.c, nor.h, nor.l, nor.o] });
  }

  var options = {
    legend: {
      show: true,
      floating: true,
    },
    chart: {
      toolbar: {
        show: true,
        offsetX: 1,
        offsetY: 0,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: false | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        autoSelected: "zoom",
      },
      type: "candlestick",
      height: 350,
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      opposite: true,
    },
    tooltip: {
      shared: true,
      theme: "dark",
      x: {
        show: true,
        format: "dd MMM  HH:mm",
        formatter: undefined,
      },
    },

    annotations: {
      yaxis: [
        {
          y: VHL.lastPrice,
          borderColor: "Black",
          label: {
            borderColor: "black",
            style: {
              color: "#fff",
              background: "black",
            },
            text: `${VHL.lastPrice}`,
            textAnchor: "start",
            offsetY: 1,
            position: "left",
          },
        },
      ],
    },
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.wazirx.com/sapi/v1/klines?symbol=${symbol}&limit=150&interval=${time}`,
    }).then((res) => {
      setStock(res.data);
    });
  }, [time, symbol]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=${symbol}`,
    }).then((res) => {
      if (res.data === null) {
        console.log("error handle");
      } else {
        setVHL(res.data);
      }
    });
  }, [symbol]);

  function calIndex() {
    for (let i = 0; i < stock.length; i++) {
      let time = parseInt(stock[i][0] * 1000 + 19800000);
      let high = parseFloat(stock[i][2]);
      let close = parseFloat(stock[i][1]);
      let open = parseFloat(stock[i][4]);
      let low = parseFloat(stock[i][3]);
      data.push({ x: time, y: [close, high, low, open] });
    }
  }
  calIndex();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <h3
            style={{
              textAlign: "center",
              color: "green",
              marginLeft: "1rem",
            }}
          >
            {symbol.toLocaleUpperCase()}
          </h3>
        </div>
        <div style={{ color: "black", marginLeft: "650px" }}>
          <h3>Last Price ₹{VHL.lastPrice}</h3>
        </div>
      </div>
      <hr />
      <div style={{ display: "flex", height: "20px" }}>

        <p id="list" onClick={() => setTime("1m")}>
          1M
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%" }}
          onClick={() => setTime("5m")}
        >
          5M
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%" }}
          onClick={() => setTime("15m")}
        >
          15M
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%" }}
          onClick={() => setTime("30m")}
        >
          30M
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%" }}
          onClick={() => setTime("1h")}
        >
          1H
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%" }}
          onClick={() => setTime("4h")}
        >
          4H
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%" }}
          onClick={() => setTime("1d")}
        >
          1D
        </p>
        <p
          id="list"
          style={{ marginLeft: "1%", marginRight: "40%" }}
          onClick={() => setTime("1w")}
        >
          1W
        </p>

        <p>Volume &nbsp;</p>
        <p style={{ fontWeight: "bold" }}>{VHL.volume} &nbsp;</p>
        <p>&nbsp; High &nbsp;</p>
        <p style={{ fontWeight: "bold" }}>{VHL.highPrice} &nbsp;</p>
        <p>&nbsp; low &nbsp;</p>
        <p style={{ fontWeight: "bold" }}>{VHL.lowPrice} &nbsp;</p>
      </div>
      <hr />
      <ReactApexChart
        id="apex-chart"
        options={options}
        series={series}
        type="candlestick"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}

export default CandleStick;
