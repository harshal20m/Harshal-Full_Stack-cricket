import { useState, useEffect } from "react";
import { getMatchState, getOvers } from "../utils/Api";
import { io } from "socket.io-client";
import Header from "../components/Header";
import Animation from "../components/Animation";
import OverList from "../components/OverList";

const socket = io("http://localhost:5000", {
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
});

const UserView = () => {
	const [match, setMatch] = useState({});
	const [action, setAction] = useState(null);
	const [overs, setOvers] = useState([]);

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

	useEffect(() => {
		fetchMatchData();
		fetchOvers();
		socket.on("connect_error", (err) => {
			console.error("Socket connection error: ", err);
		});

		socket.on("scoreUpdate", (data) => {
			setMatch(data.match);
			setAction({
				type: data.actionType,
				value: data.actionValue,
			});
		});

		return () => {
			socket.off("connect_error");
			socket.off("scoreUpdate");
		};
	}, []);
	useEffect(() => {
		fetchOvers();
	}, [match]);

	return (
		<div className="flex justify-center min-h-screen bg-gradient-to-r bg-gray-100 p-6">
			<div className="max-w-lg w-full mt-12 space-y-8">
				<Header
					runs={match.currentRuns}
					wickets={match.currentWickets}
					overs={match.currentOver}
					nextBallIndex={getNextBallIndex()}
				/>
				<Animation action={action} />
				<OverList overs={overs} />
			</div>
		</div>
	);
};

export default UserView;
