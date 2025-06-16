import commonstyles from "../styles/bem-common.module.css";

interface LabelTextProps {
  label: string;
  text: string | number;
  nowrap?: boolean;
}

export default function LabelText(props: LabelTextProps) {
  return (
    <div className={commonstyles["flex--row-gap-sm"]}>
      <div className={commonstyles["text--bold"]}>{props.label}:</div>
      {props.nowrap ? (
        <div className={commonstyles["text--nowrap"]}>{props.text}</div>
      ) : (
        props.text
      )}
    </div>
  );
}
