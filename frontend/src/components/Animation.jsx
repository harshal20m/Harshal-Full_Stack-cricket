import { useState, useEffect } from "react";

const Animation = ({ action }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (action) {
			setVisible(true);
			const timer = setTimeout(() => setVisible(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [action]);

	return (
		<div className="flex justify-center items-center bg-blue-50 p-4 rounded-md shadow-md">
			{action && visible ? (
				<div className="text-center text-lg font-bold">
					{action.type === "wicket" ? "Wicket!" : `${action.value} Runs!`}
					{action.value === 1 && <img src="/number1.gif" alt="1 Run" />}
					{action.value === 2 && <img src="/number2.gif" alt="2 Runs" />}
					{action.value === 3 && <img src="/number3.gif" alt="3 Runs" />}
					{action.value === 4 && <img src="/number4.gif" alt="4 Runs" />}
					{action.value === 6 && <img src="/number6.gif" alt="6 Runs" />}
					{action.type === "wicket" && <img src="/wicket.gif" alt="Wicket" />}
				</div>
			) : (
				<p className="text-gray-500 text-lg font-semibold">Match in Progress</p>
			)}
		</div>
	);
};

export default Animation;
