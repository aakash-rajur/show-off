const PROFILE_SIZE = 100;

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
			height: '100%',
			margin: 0,
			'& #root': {
				height: '100%'
			}
		},
		'::-webkit-scrollbar': {
			width: 0,
			height: 0
		}
	},
	app: {
		height: '100%',
		display: 'grid',
		gridTemplate: '1fr/1fr 55%',
		margin: '0 auto'
	},
	portfolio: {
		padding: `30px 40px 30px 80px`
	},
	infoWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		padding: `0 80px 0 40px`,
		background: 'white'
	},
	info: {
		width: 400,
		height: 600
	},
	profileContainer: {
		width: PROFILE_SIZE,
		height: PROFILE_SIZE,
		objectFit: 'cover',
		borderRadius: '50%',
		boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
		marginBottom: 50
	},
	profile: {
		borderRadius: '50%'
	},
	emphasis: {
		fontSize: '1.5em',
		marginBottom: 16,
		fontWeight: 'normal'
	},
	decoration: {
		background: 'black',
		width: 100,
		height: 4,
		borderRadius: 4,
		margin: '30px 0 60px'
	},
	bio: {
		lineHeight: '2.5em',
		color: 'gray'
	},
	'@media (max-width: 1024px)': {
		infoWrapper: {
			paddingRight: '60px'
		},
		info: {
			width: 'auto'
		},
		emphasis: {
			fontSize: '1.2em'
		},
		bio: {
			lineHeight: '2.2em'
		},
		portfolio: {
			paddingLeft: '60px'
		}
	},
	'@media (max-width: 600px)': {
		app: {
			gridTemplate: 'auto 1fr/1fr'
		},
		bio: {
			display: 'none'
		},
		decoration: {
			display: 'none'
		},
		infoWrapper: {
			padding: '12px 16px',
			zIndex: 2,
			position: 'sticky',
			top: 0,
		},
		info: {
			width: '100%',
			height: 'initial',
			display: 'grid',
			gridTemplate: 'repeat(2, auto)/auto 1fr',
			gridGap: '4px 16px',
			'& > h2': {
				alignSelf: 'end'
			}
		},
		profileContainer: {
			marginBottom: 'initial',
			gridRow: 'span 2',
			width: '52px',
			height: '52px',
			alignSelf: 'center'
		},
		emphasis: {
			margin: 0,
			fontSize: '0.9em'
		},
		portfolio: {
			padding: '30px 20px',
			width: 'initial'
		}
	}
};