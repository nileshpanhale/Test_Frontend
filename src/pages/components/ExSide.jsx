import {React , useEffect , useState} from 'react';
import axios from "axios";
import "../candlestick.css"
import { useDispatch } from 'react-redux';
import { Chartsymbol } from '../redux/actions/coinDBAction';

export default function ExSide() {
  const dispatch = useDispatch();
  const [first, setfirst] = useState([]);
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.wazirx.com/sapi/v1/exchangeInfo`,
    }).then((res) => {
      setfirst(res.data.symbols);
    });
  }, []);
  function handling(e) {
    setInputData(e.target.value);
  }
  function filttering(d) {
    if (
      inputData === "" ||
      d.baseAsset.toLowerCase().includes(inputData.toLocaleLowerCase())
    ) {
      return d;
    }
  }
  return (
    <div style={{width: "100%"}}> 
      <input
        placeholder="Search For Coin"
        onChange={handling}
        type="text"
        style={{
          marginTop: "1%",
          width: "100%",
          height: "25px",
          border: "2px Solid grey",
          borderRadius: "100px",
        }}
      />
      <div style={{ height: "700px", overflowY: "scroll" }}>
        {first &&
          first.filter(filttering).map((d, i) => {
            return (
              <div key={i}>
                <p
                  id="list"
                  onClick={() => dispatch(Chartsymbol(d.symbol))}
                  style={{ textAlign: "center" }}
                >
                  {d.symbol}
                </p>
              </div>
            );
          })}
      </div>
    </div>
      )
}
