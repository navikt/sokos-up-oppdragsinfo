import commonstyles from "../styles/common-styles.module.css";

interface LabelTextProps {
	label: string;
	text: string | number;
	nowrap?: boolean;
}

export default function LabelText(props: LabelTextProps) {
	return (
		<div className={commonstyles["flex--row-gap-sm"]}>
			<div className={commonstyles["text--bold"]}>{props.label}:</div>
			<div
				className={
					props.nowrap
						? commonstyles["text--nowrap"]
						: commonstyles["text--wrap"]
				}
			>
				{props.text}
			</div>
		</div>
	);
}
