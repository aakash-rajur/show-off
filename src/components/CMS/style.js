export default {
	'@global': {
		'@import': [
			'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700',
			'https://fonts.googleapis.com/icon?family=Material+Icons'
		],
		'html': {
			height: '100vh',
			fontFamily: `'Open Sans', sans-serif`
		},
		'body': {
			height: '100vh',
			maxHeight: '100vh',
			margin: 0,
			overflow: 'hidden',
			'& #root': {
				height: '100%'
			}
		},
		'::-webkit-scrollbar': {
			width: 0,
			height: 0
		}
	},
	backgroundPosition: {
		height: '110%',
		width: '110%',
		position: 'absolute',
		left: '-5%', top: '-5%',
	},
	backgroundCloak: {
		background: '#2b2b2b',
		'& > *': {
			display: 'none'
		}
	},
	backgroundImage: {
		objectFit: 'cover',
		transition: 'all 0.3s'
	},
	backgroundSuccess: {
		filter: 'blur(12px) grayscale(1)'
	}
}