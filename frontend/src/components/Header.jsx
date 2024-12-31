const Header = ({ runs, wickets, overs, nextBallIndex }) => {
	return (
		<div className="w-full p-4 rounded-md shadow-md">
			<h1 className="text-4xl font-bold text-center">
				{runs}/{wickets}
			</h1>
			<p className="text-lg text-center mt-3">
				Over( {overs}.{nextBallIndex} )
			</p>
		</div>
	);
};

export default Header;
