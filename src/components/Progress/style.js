export default {
	container: {
		height: '1rem',
		overflow: 'hidden',
		borderRadius: '4px',
		background: 'lightgray'
	},
	progress: {
		background: ({color}) => color,
		width: ({progress}) => `${Math.floor(progress * 100)}%`,
		transition: 'all 0.5s ease'
	}
};