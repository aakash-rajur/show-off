const PROFILE_SIZE = 100;

export default {
	'@global': {
		'@import': [
			'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700',
			'https://fonts.googleapis.com/css?family=Montserrat:400,700',
			'https://fonts.googleapis.com/icon?family=Material+Icons'
		],
		html: {
			height: '100vh',
			fontFamily: `'Open Sans', sans-serif`
		},
		body: {
			height: '100%',
			margin: 0,
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
	app: {
		height: '100%',
		display: 'grid',
		gridTemplate: '1fr/1fr 55%',
		margin: '0 auto',
		overflow: 'hidden'
	},
	infoWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		padding: `0 80px 0 40px`,
		background: 'white',
		zIndex: 1
	},
	info: {
		width: 400,
		height: 600,
		position: 'relative',
	},
	profileContainer: {
		width: PROFILE_SIZE,
		height: PROFILE_SIZE,
		objectFit: 'cover',
		borderRadius: '50%',
		marginBottom: 50
	},
	profile: {
		borderRadius: '50%',
		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
	},
	emphasis: {
		fontSize: '1em',
		fontWeight: 'normal'
	},
	name: {
		extend: 'emphasis',
		fontSize: '2em',
		marginBottom: 16,
	},
	title: {
		extend: 'emphasis',
		color: 'gray',
		marginBottom: 0,
		letterSpacing: '2px',
		fontStyle: 'italic'
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
		color: 'gray',
		letterSpacing: '1px'
	},
	share: {
		position: 'absolute',
		left: 0, bottom: 0,
		height: 40, width: '100%',
		gridTemplate: '1fr/repeat(3, auto)',
		justifyContent: 'center',
		alignItems: 'center',
		gridGap: '32px'
	},
	animationLocation: {
		gridRow: '1',
		gridColumn: '2'
	},
	portfolio: {
		padding: `30px 40px 30px 80px`
	},
	project: {
		padding: `30px 40px 30px 80px`
	},
	icon: {
		width: 28, height: 28,
		'& img': {
			width: '100%',
			height: '100%'
		}
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
		},
		project: {
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
			position: 'fixed',
			top: 0,
			width: '100%'
		},
		info: {
			width: '100%',
			height: 'initial',
			display: 'grid',
			gridTemplate: 'auto/auto 1fr',
			gridGap: '4px 16px',
			'& > div:nth-child(2) > div:first-child': {
				display: 'grid',
				gridTemplate: '1fr/repeat(2,auto)',
				gridGap: '8px',
				alignItems: 'center',
				justifyContent: 'end',
				direction: 'rtl'
			},
			'& > div:nth-child(2) > div:last-child': {
				display: 'grid',
				gridTemplate: 'auto/1fr',
				alignContent: 'center'
			}
		},
		profileContainer: {
			marginBottom: 'initial',
			width: '52px',
			height: '52px',
			alignSelf: 'center'
		},
		emphasis: {
			margin: 0,
			fontSize: '0.9em'
		},
		name: {
			fontSize: '0.9em',
			margin: 0,
		},
		title: {
			fontSize: '0.9em',
			margin: 0,
			paddingLeft: 10,
			position: 'relative',
			'&::after': {
				position: 'absolute',
				left: 0,
				color: 'black',
				content: "'|'"
			}
		},
		animationLocation: {
			gridRow: '2',
			gridColumn: '1'
		},
		portfolio: {
			padding: '100px 20px 80px',
			width: 'initial',
			height: '100%'
		},
		project: {
			padding: '30px 20px',
			width: 'initial',
		},
		share: {
			position: 'fixed',
			background: 'white',
			zIndex: 2,
			padding: '8px 0'
		}
	}
};