export default {
	'@global': {
		'#root': {
			display: 'grid',
			gridTemplate: '1fr/1fr',
		}
	},
	login: {
		background: 'white',
		boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
		borderRadius: 4,
		padding: 16,
		zIndex: 2,
		minWidth: 300,
		marginRight: 40,
		alignSelf: 'center',
		justifySelf: 'end',
		display: 'grid',
		gridTemplate: 'auto/1fr',
		gridGap: '12px',
		'& input': {
			border: '1px solid #ced4da',
			borderRadius: '4px',
			fontSize: '1em',
			lineHeight: '1.5em',
			padding: '0.5em 1em'
		},
		'& button': {
			justifySelf: 'center',
			background: '#007bff',
			color: 'white',
			border: 'none',
			cursor: 'pointer',
			fontSize: '1em',
			padding: '0.5em 1em',
			borderRadius: '4px',
			boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
		},
		'& button[disabled], & button:disabled': {
			opacity: 0.5,
			cursor: 'progress'
		},
		'& span': {
			color: 'red',
			fontSize: '0.6em'
		}
	}
};