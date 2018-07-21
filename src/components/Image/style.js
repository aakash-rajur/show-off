export default {
	container: {
		display: 'inline-grid',
		gridTemplate: '1fr/1fr'
	},
	overlap: {
		gridRow: 1,
		gridColumn: 1
	},
	hidden: {
		visibility: 'hidden'
	},
	image: {
		extend: 'overlap',
		width: '100%',
		height: '100%',
		objectFit: 'cover'
	},
	cloak: {
		extend: 'overlap',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems:'center',
		background: 'white',
		'& span': {
			textAlign: 'center'
		}
	},
	'@media (max-width: 600px)': {
		cloak: {
			'& span': {
				fontSize: '0.8em'
			}
		}
	}
};