import {MIN_TILE_SIZE} from "../../utils/library";

export default {
	container: {
		height: '100%',
		background: 'white',
		gridTemplate: `1fr/${2 * MIN_TILE_SIZE}vw`
	},
	videoWrapper: {
		position: 'relative',
		background: 'gray',
		height: 0,
		paddingTop: `${9 / 16 * 100}%`,
		alignSelf: 'center',
		'& > div': {
			position: 'absolute',
			top: 0, left: 0
		}
	},
	fadingImage: {
		position: 'absolute',
		top: 0, left: 0,
		height: '100%',
		width: '100%',
		'& > img': {
			width: '100%',
			height: '100%'
		}
	},
	close: {
		position: 'absolute',
		cursor: 'pointer',
		background: 'white',
		padding: 12, right: -20,
		top: `calc(-${32 + 2 * 12 + 8}px)`,
		color: 'gray',
		fontSize: '32px'
	},
	'@media (min-width: 600px) and (max-width: 800px)': {
		container: {
			gridTemplate: '1fr/1fr'
		}
	},
	'@media (max-width: 600px)': {
		container: {
			gridTemplate: `1fr/${4 * MIN_TILE_SIZE}vw`,
			justifyContent: 'center'
		},
		videoWrapper: {
			alignSelf: 'initial',
			marginTop: '50%'
		}
	}
}