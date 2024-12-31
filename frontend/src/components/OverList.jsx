// import React from "react";

// // Helper function to determine ball color based on the score
// const getBallColor = (score) => {
// 	if (score === -1) return "bg-red-500"; // Wicket (red)
// 	if (score === 6) return "bg-green-500"; // Six (green)
// 	if (score === 4) return "bg-yellow-500"; // Four (yellow)
// 	if (score >= 1 && score <= 3) return "bg-gray-500"; // 1, 2, 3 (gray)
// 	return "bg-gray-300"; // Default color for unbowled balls
// };

// const OverList = ({ overs }) => {
// 	return (
// 		<div className="mt-4">
// 			<h2 className="text-lg font-bold">Completed Overs:</h2>
// 			<ul className="list-disc pl-5">
// 				{overs.map((over, index) => (
// 					<li key={index}>
// 						Over {over.overNumber + 1}: <BallRow balls={over.balls} />
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// const BallRow = ({ balls }) => {
// 	return (
// 		<div className="flex space-x-2 mt-2">
// 			{balls.map((ball, index) => (
// 				<div
// 					key={index}
// 					className={`w-14 h-14 border-4 border-gray-300 flex items-center justify-center rounded-full text-white ${getBallColor(
// 						ball
// 					)}`}
// 				>
// 					{ball === -1 ? "W" : ball !== undefined ? ball : "N/A"}
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default OverList;

import React from "react";

// Helper function to determine ball color based on the score
const getBallColor = (score) => {
	if (score === -1) return "bg-red-500"; // Wicket (red)
	if (score === 6) return "bg-green-500"; // Six (green)
	if (score === 4) return "bg-yellow-500"; // Four (yellow)
	if (score >= 1 && score <= 3) return "bg-gray-500"; // 1, 2, 3 (gray)
	return "bg-gray-300"; // Default color for unbowled balls
};

const OverList = ({ overs }) => {
	return (
		<div className="mt-4">
			<h2 className="text-lg font-bold">Completed Overs:</h2>
			{/* Table Layout */}
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto border-collapse">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b">Over</th>
							<th className="px-4 py-2 border-b">Runs</th>
						</tr>
					</thead>
					<tbody>
						{/* Loop through the overs and display each over with its balls */}
						{overs.map((over, index) => (
							<tr key={index}>
								<td className="px-4 py-2 border-b text-center">{over.overNumber + 1}</td>
								<td className="px-4 py-2 border-b">
									{/* Display each ball in the over */}
									{over.balls.map((ball, ballIndex) => (
										<div
											key={ballIndex}
											className={` w-14 h-14 inline-block mr-2 border-4 border-gray-300 rounded-full text-center text-white ${getBallColor(
												ball
											)}`}
										>
											<p className="flex items-center justify-center h-full text-center">
												{ball === -1 ? "W" : ball}
											</p>
										</div>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OverList;
