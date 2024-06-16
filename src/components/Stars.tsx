interface Props {
	onSetRating: (rating: number) => void;
}

const Stars = ({ onSetRating }: Props) => {
	return (
		<div className="flex flex-row gap-2">
			<button onClick={() => onSetRating(1)}>1</button>
			<button onClick={() => onSetRating(2)}>2</button>
			<button onClick={() => onSetRating(3)}>3</button>
			<button onClick={() => onSetRating(4)}>4</button>
			<button onClick={() => onSetRating(5)}>5</button>
		</div>
	);
};

export default Stars;
