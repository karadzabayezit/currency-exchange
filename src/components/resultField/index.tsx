import { Currencies } from "@/data/types";

import styles from "./styles.module.scss";

import useDebounce from "@/hooks/useDebounce";

interface IResultFieldProps {
  amount: number | string;
  fromValue: Currencies;
  toValue: Currencies;
  atTheTime: string;
  fetchedValue: number;
}
const ResultField = ({ amount, fromValue, toValue, atTheTime, fetchedValue }: IResultFieldProps) => {
  const debouncedResult = useDebounce(fetchedValue * Number(amount), 500);

  return (
    <div className={`${styles.resultField} ${amount && styles.showResultField}`}>
      <h4>
        {Number(amount).toFixed(2) || 1.0} {(fromValue ? fromValue.shortName : "").toUpperCase()} &nbsp;=
      </h4>
      <h2>
        {debouncedResult.toFixed(2)} {(toValue ? toValue.shortName : "").toUpperCase()}
      </h2>
      <h6>At the time of {atTheTime}</h6>
    </div>
  );
};
export default ResultField;
