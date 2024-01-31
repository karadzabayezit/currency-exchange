"use client";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
//MATERIAL UI
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SyncAlt from "@mui/icons-material/SyncAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Currencies } from "@/data/types";

import CurrenciesTable from "../currenciesTable";
import ResultField from "../resultField";

const Converter = () => {
  const [data, setData] = useState<Currencies[]>([]);
  const [fromValue, setFromValue] = useState({ shortName: "usd", fullName: "US Dollar" });
  const [toValue, setToValue] = useState({ shortName: "eur", fullName: "Euro" });
  const [fetchedValue, setFetchedValue] = useState(1);
  const [amount, setAmount] = useState("");
  const [atTheTime, setAtTheTime] = useState("");
  const [showAllCurr, setShowAllCurr] = useState(false);

  const handleSwitch = () => { //Switching currencies
    const firstVal = fromValue;
    setFromValue(toValue);
    setToValue(firstVal);
  };

  useEffect(() => { // To get Currencies List
    const fetchData = async (url: string) => {
      const response = await fetch(url);
      await response.json().then((data) => {
        let currenciesArray: Currencies[] = Object.keys(data).map((key) => ({
          shortName: key,
          fullName: data[key],
        }));
        setData(currenciesArray);
      });
    };
    fetchData("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json");
  }, []);

  useEffect(() => { //To get exchange value
    const fetchValues = async () => {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromValue.shortName}/${toValue.shortName}.json`
      );
      const data = await response.json();
      const price = data[toValue.shortName];
      const date = data.date;
      setFetchedValue(price);
      setAtTheTime(date);
    };
    fromValue && toValue && fetchValues(); // if both are selected, then fetch
  }, [fromValue, toValue]);

  console.log("rerender"); // to see renders
  return (
    <div className={styles.wrapper}>
      {atTheTime ? ( // Loading check, while we get the response 
        <div className={styles.currencesContainer}>
          <FormControl className={styles.amountContainer}>
            <InputLabel>Amount</InputLabel>
            <OutlinedInput
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target?.value)}
              type="number"
              placeholder="1.00"
              startAdornment={<InputAdornment position="start">--</InputAdornment>}
            />
          </FormControl>

          <Autocomplete
            className={styles.currencySelect}
            value={fromValue}
            onChange={(event: any, newValue: any) => {
              setFromValue(newValue);
            }}
            options={data}
            getOptionLabel={(option) => `${option.shortName.toUpperCase()} - ${option.fullName}`}
            renderInput={(params) => <TextField {...params} label="From" />}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.shortName} className={styles.listItem}>
                {option.shortName.toUpperCase()} &nbsp;-&nbsp;
                <span key={option.fullName}>{option.fullName}</span>
              </Box>
            )}
          />

          <Button className={styles.changeCurrButton} onClick={handleSwitch}>
            <SyncAlt /> {/*THIS IS A MUI ICON*/}
          </Button>

          <Autocomplete
            className={styles.currencySelect}
            value={toValue}
            onChange={(event: any, newValue: any) => {
              setToValue(newValue);
            }}
            options={data}
            getOptionLabel={(option) => `${option.shortName.toUpperCase()} - ${option.fullName}`}
            renderInput={(params) => <TextField {...params} label="To" />}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.shortName} className={styles.listItem}>
                {option.shortName.toUpperCase()} &nbsp;-&nbsp;
                <span key={option.fullName}>{option.fullName}</span>
              </Box>
            )}
          />
        </div> 
      ) : (<CircularProgress />) //Loading Circle
      }
      {/* Filed, where the last result will be showed  */}
      <ResultField
        amount={amount}
        fromValue={fromValue}
        toValue={toValue}
        atTheTime={atTheTime}
        fetchedValue={fetchedValue}
      /> 

      <div className={styles.showAllCurr} onClick={() => {setShowAllCurr(!showAllCurr);}}>
        {showAllCurr ? "HIDE" : "SHOW"} ALL CURRENCIES{" "}
      </div>

      <CurrenciesTable
        data={data}
        setFromValue={setFromValue}
        setToValue={setToValue}
        showAllCurr={showAllCurr}
      />
    </div>
  );
};
export default Converter;
