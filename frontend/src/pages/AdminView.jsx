import { useState, useEffect } from "react";
import { getMatchState, updateScore, getOvers } from "../utils/Api";
import Header from "../components/Header";
import OverList from "../components/OverList";
import BallPointer from "../components/BallPointer";

const AdminView = () => {
	const [match, setMatch] = useState({});
	const [overs, setOvers] = useState([]);
	const [ballScores, setBallScores] = useState([]);

	const fetchMatchData = async () => {
		const data = await getMatchState();
		setMatch(data);
	};

	const fetchOvers = async () => {
		const data = await getOvers();
		setOvers(data);
	};

	const getNextBallIndex = () => {
		if (overs.length > 0) {
			const lastOver = overs[overs.length - 1];
			return lastOver.balls.length;
		}
		return 0;
	};

	const handleScoreUpdate = async (runs, isWicket = false) => {
		const nextBall = getNextBallIndex();
		const updatedScores = [...ballScores];
		updatedScores[nextBall] = runs;
		setBallScores(updatedScores);

		await updateScore({ runs, isWicket });
		fetchMatchData();
		fetchOvers();
	};

	const resetScores = () => {
		setBallScores([]);
	};

	useEffect(() => {
		fetchMatchData();
		fetchOvers();
	}, []);

	useEffect(() => {
		if (getNextBallIndex() === 0) {
			resetScores();
		}
	}, [overs]);

	return (
		<div className="flex flex-col justify-center items-center  bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-6 mt-3 flex flex-col items-center max-w-xl w-full">
				<Header
					runs={match.currentRuns}
					wickets={match.currentWickets}
					overs={match.currentOver}
					nextBallIndex={getNextBallIndex()}
				/>

				<BallPointer nextBallIndex={getNextBallIndex()} ballScores={ballScores} />
				<div className="mt-6 flex flex-col items-center">
					<h2 className="text-lg font-bold text-center mb-4">Update Score</h2>
					<div className="flex flex-wrap justify-end gap-2 max-w-[18rem]">
						{[0, 1, 2, 3, 4, 6].map((runs) => (
							<button
								key={runs}
								className="bg-green-500 text-white p-2 rounded-full w-14 h-14"
								onClick={() => handleScoreUpdate(runs)}
							>
								{runs}
							</button>
						))}
						<button
							className="bg-red-500 text-white text-sm p-2 rounded-full w-14 h-14 "
							onClick={() => handleScoreUpdate(0, true)}
						>
							Wicket
						</button>
					</div>
				</div>
				<div className="mt-6">
					<OverList overs={overs} />
				</div>
			</div>
		</div>
	);
};

export default AdminView;
