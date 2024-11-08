import commonstyles from "../styles/common-styles.module.css";

interface LabelTextProps {
  label: string;
  text: string | number;
  nowrap?: boolean;
}

export default function LabelText(props: LabelTextProps) {
  return (
    <div className={commonstyles.row}>
      <div className={commonstyles.bold}>{props.label}:</div>
      {props.nowrap ? (
        <div className={commonstyles.nowrap}>{props.text}</div>
      ) : (
        props.text
      )}
    </div>
  );
}
