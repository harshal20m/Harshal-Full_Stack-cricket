import React from "react";

const BallPointer = ({ nextBallIndex, ballScores }) => {
	const getBallColor = (score) => {
		if (score === -1) return "bg-red-500";
		if (score === 6) return "bg-green-500";
		if (score === 4) return "bg-yellow-500";
		if (score >= 1 && score <= 3) return "bg-gray-500";
		return "bg-gray-300";
	};

	return (
		<div className="mt-4">
			<h2 className="text-lg font-bold text-center mb-6">Current Over</h2>
			<div className="flex space-x-2 mt-2">
				{[0, 1, 2, 3, 4, 5].map((ballIndex) => (
					<div key={ballIndex} className="flex flex-col items-center">
						<div
							className={`w-14 h-14 rounded-full flex items-center justify-center ${
								ballIndex === nextBallIndex
									? "bg-blue-500 text-white"
									: getBallColor(ballScores[ballIndex])
							}`}
						>
							{" "}
							{ballScores[ballIndex] !== undefined && (
								<p className="text-center text-black">{ballScores[ballIndex]}</p> // Show score next to ball
							)}
						</div>
						<p className="text-xs pt-2">ball No.{ballIndex + 1}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default BallPointer;
