const MIN_TILE_SIZE = 20;

export const tileStyle = {
	tile: {
		width: `${MIN_TILE_SIZE}vw`,
		height: `${MIN_TILE_SIZE}vw`,
		maxWidth: 300,
		maxHeight: 300,
		gridRow: 'span 2',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
		borderRadius: '50%',
		cursor: 'pointer',
		position: 'relative',
		'&:hover': {
			boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
		}
	},
	image: {
		borderRadius: '50%'
	},
	'@media (max-width: 600px)': {
		tile: {
			width: `${MIN_TILE_SIZE * 2}vw`,
			height: `${MIN_TILE_SIZE * 2}vw`
		}
	}
};

export default {
	container: {
		height: '100%',
		width: 'fit-content',
		display: 'grid',
		gridTemplate: `auto/repeat(2, auto)`,
		justifyItems: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'scroll',
		gridGap: '16px',
		boxSizing: 'border-box',
		maxHeight: '100vh',
		'-webkit-overflow-scrolling': 'touch'
	},
	spacer: {
		width: '100%',
		height: `${MIN_TILE_SIZE / 2}vw`,
		maxHeight: 150,
		gridRow: 'span 1'
	},
	'@media (min-width: 600px) and (max-width: 800px)': {
		container: {
			gridTemplate: 'auto/auto'
		},
		spacer: {
			display: 'none'
		}
	}
}