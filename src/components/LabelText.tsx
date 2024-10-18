import commonstyles from "../styles/common-styles.module.css";

interface LabelTextProps {
  label: string;
  text: string | number;
}

export default function LabelText(props: LabelTextProps) {
  return (
    <div className={commonstyles.row}>
      <div className={commonstyles.bold}>{props.label}:</div>
      <div>{props.text}</div>
    </div>
  );
}
