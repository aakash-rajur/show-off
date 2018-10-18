import {MIN_TILE_SIZE} from "../../utils/library";
import {PROJECT_VISIBLE} from "./Project";

export default {
	container: {
		height: '100vh',
		background: 'white',
		display: 'grid',
		gridTemplate: `1fr/${2 * MIN_TILE_SIZE}vw`,
		boxSizing: 'border-box',
		zIndex: ({visible}) => visible === PROJECT_VISIBLE ? 2: null
	},
	aspectRatio: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0, left: 0
	},
	videoWrapper: {
		position: 'relative',
		height: 0,
		paddingTop: `${9 / 16 * 100}%`,
		alignSelf: 'center',
		'& > div:first-child': {
			extend: 'aspectRatio',
			boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		}
	},
	close: {
		position: 'absolute',
		cursor: 'pointer',
		padding: 12,
		right: -36, top: -46,
		color: 'gray',
		fontSize: '32px'
	},
	description: {
		display: 'none',
		gridRow: '1',
		gridColumn: '1',
		alignSelf: 'end',
		color: 'gray',
		'& pre': {
			margin: 0,
			fontSize: '1.2em',
			lineHeight: '2em',
			textAlign: 'end'
		}
	},
	'@media (min-width: 600px) and (max-width: 800px)': {
		container: {
			gridTemplate: '1fr/1fr'
		}
	},
	'@media (max-width: 600px)': {
		container: {
			gridTemplate: `1fr/${4 * MIN_TILE_SIZE}vw`,
			justifyContent: 'center',
			height: '100%'
		},
		videoWrapper: {
			alignSelf: 'initial',
			marginTop: '70%',
			gridRow: '1',
			gridColumn: '1',
		},
		description: {
			display: 'initial',
			'& pre': {
				fontSize: '1em'
			}
		}
	}
}