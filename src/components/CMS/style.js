export default {
	'@global': {
		'@import': [
			'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700',
			'https://fonts.googleapis.com/icon?family=Material+Icons'
		],
		html: {
			height: '100vh',
			fontFamily: `'Open Sans', sans-serif`
		},
		body: {
			height: '100vh',
			maxHeight: '100vh',
			margin: 0,
			overflow: 'hidden',
			'& #root': {
				height: '100%'
			}
		},
		'pre, textarea': {
			fontFamily: "monospace, sans-serif",
			fontSize: '13px'
		},
		'::-webkit-scrollbar': {
			width: 0,
			height: 0
		}
	},
	modernButton: {
		'& button': {
			border: 'none',
			padding: '0.75em 1.25em',
			fontSize: '1em',
			borderRadius: '4px',
			cursor: 'pointer',
			boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
		},
		'& button[disabled], & button:disabled': {
			opacity: 0.5,
			cursor: 'not-allowed'
		},
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
	},
	modal: {
		height: '100%', width: '100%',
		position: 'fixed',
		left: 0, right: 0,
		background: 'rgba(0, 0, 0, 0.75)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	dialog: {
		background: 'white',
		borderRadius: '4px',
		extend: 'modernButton',
		paddingBottom: '1em',
		textAlign: 'end',
		width: 540
	},
	title: {
		fontWeight: 'normal',
		background: '#343a40',
		color: 'white',
		padding: 16,
		margin: 0,
		borderRadius: '2px 2px 0 0',
		textAlign: 'initial'
	},
	info: {
		margin: '1em',
		textAlign: 'initial',
		fontSize: '1.2em',
		display: 'flex',
		justifyContent: 'space-between',
		'& > div': {
			display: 'inline',
			maxWidth: '50%'
		},
		'& span': {
			display: 'inline',
			fontWeight: 'bold'
		},
		'& .success': {
			color: '#007bff'
		},
		'& .fail': {
			color: '#dc3545'
		},
		'& .total': {
			color: '#17a2b8'
		}
	},
	progress: {
		margin: '1em'
	},
	ok: {
		margin: '0 1em',
		background: '#17a2b8',
		color: 'white'
	}
}