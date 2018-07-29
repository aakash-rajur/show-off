import {MIN_TILE_SIZE} from "../../utils/library";

export const ANIMATION_SHRINK = 'shrink';
export const ANIMATION_GROW = 'grow';

export const tileStyle = {
	[`@keyframes ${ANIMATION_SHRINK}`]: {
		from: {
			width: `${MIN_TILE_SIZE}vw`,
			height: `${MIN_TILE_SIZE}vw`
		},
		to: {
			width: 0,
			height: 0
		}
	},
	[`@keyframes ${ANIMATION_GROW}`]: {
		from: {
			width: 0,
			height: 0
		},
		to: {
			width: `${MIN_TILE_SIZE}vw`,
			height: `${MIN_TILE_SIZE}vw`
		}
	},
	tile: {
		width: `${MIN_TILE_SIZE}vw`,
		height: `${MIN_TILE_SIZE}vw`,
		maxWidth: 300,
		maxHeight: 300,
		gridRow: 'span 2'
	},
	image: {
		width: `${MIN_TILE_SIZE}vw`,
		height: `${MIN_TILE_SIZE}vw`,
		maxWidth: 300,
		maxHeight: 300,
		borderRadius: '50%',
		cursor: 'pointer',
		justifySelf: 'center',
		alignSelf: 'center'
	},
	animation: {
		display: ({visible}) => visible ? 'initial' : 'none',
		animation: ({animation}) => animation && `${animation} 0.5s both ease-in-out`,
		transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		'&:hover': {
			boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
		},
	},
	'@media (min-width: 600px) and (max-width: 800px)': {
		[`@keyframes ${ANIMATION_SHRINK}`]: {
			from: {
				width: '30vw',
				height: '30vw'
			},
			to: {
				width: 0,
				height: 0
			}
		},
		[`@keyframes ${ANIMATION_GROW}`]: {
			from: {
				width: 0,
				height: 0
			},
			to: {
				width: '30vw',
				height: '30vw'
			}
		},
		tile: {
			width: '30vw',
			height: '30vw'
		},
		image: {
			width: '30vw',
			height: '30vw'
		}
	},
	'@media (max-width: 600px)': {
		[`@keyframes ${ANIMATION_SHRINK}`]: {
			from: {
				width: `${MIN_TILE_SIZE * 2}vw`,
				height: `${MIN_TILE_SIZE * 2}vw`
			},
			to: {
				width: 0,
				height: 0
			}
		},
		[`@keyframes ${ANIMATION_GROW}`]: {
			from: {
				width: 0,
				height: 0
			},
			to: {
				width: `${MIN_TILE_SIZE * 2}vw`,
				height: `${MIN_TILE_SIZE * 2}vw`
			}
		},
		tile: {
			width: `${MIN_TILE_SIZE * 2}vw`,
			height: `${MIN_TILE_SIZE * 2}vw`
		},
		image: {
			width: `${MIN_TILE_SIZE * 2}vw`,
			height: `${MIN_TILE_SIZE * 2}vw`
		}
	}
};

export default {
	container: {
		width: 'fit-content',
		height: '100%',
		display: 'grid',
		gridTemplate: `minmax(${MIN_TILE_SIZE / 2}vw, 150px)/repeat(2, auto)`,
		justifyItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'start',
		overflow: 'scroll',
		gridGap: '16px',
		boxSizing: 'border-box',
		maxHeight: '100vh',
		'-webkit-overflow-scrolling': 'touch'
	},
	spacer: {
		width: '100%',
		height: '100%',
		gridRow: 'span 1'
	},
	'@media (min-width: 600px) and (max-width: 800px)': {
		container: {
			gridTemplate: '30vw/1fr',
			width: 'initial'
		},
		spacer: {
			display: 'none'
		}
	},
	'@media (max-width: 600px)': {
		container: {
			gridTemplate: `${MIN_TILE_SIZE}vw/repeat(2, ${2 * MIN_TILE_SIZE }vw)`
		}
	}
}