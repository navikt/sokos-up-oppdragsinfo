import commonstyles from "../../styles/common-styles.module.css";

const LabelText = ({
  label,
  text,
}: {
  label: string;
  text: string | number;
}) => (
  <div className={commonstyles.row}>
    <div className={commonstyles.bold}>{label}:</div>
    <div>{text}</div>
  </div>
);
export default LabelText;
