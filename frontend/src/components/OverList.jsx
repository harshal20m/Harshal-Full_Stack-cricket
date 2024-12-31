import React from "react";

const getBallColor = (score) => {
	if (score === -1) return "bg-red-500";
	if (score === 6) return "bg-green-500";
	if (score === 4) return "bg-yellow-500";
	if (score >= 1 && score <= 3) return "bg-gray-500";
	return "bg-gray-300";
};

const OverList = ({ overs }) => {
	return (
		<div className="mt-4">
			<h2 className="text-lg font-bold">Completed Overs:</h2>

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto border-collapse">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b">Over</th>
							<th className="px-4 py-2 border-b">Runs</th>
						</tr>
					</thead>
					<tbody>
						{overs.map((over, index) => (
							<tr key={index}>
								<td className="px-4 py-2 border-b text-center">{over.overNumber + 1}</td>
								<td className="px-4 py-2 border-b">
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
