export default {
	container: {
		height: '100%',
		width: '100%',
		top: 0, left: 0,
		position: 'absolute',
		display: 'grid',
		gridTemplate: 'auto 1fr 60px/1fr',
		gridGap: '16px',
		padding: 16,
		boxSizing: 'border-box',
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
	section: {},
	personal: {
		extend: 'section',
		display: 'grid',
		gridTemplate: 'auto/50% 1fr',
		gridGap: '8px',
		'& h1': {
			gridColumn: 'span 2'
		},
		'& label span': {
			width: 100
		}
	},
	bio: {
		gridColumn: 'span 2'
	},
	portfolio: {
		extend: 'section',
		display: 'grid',
		gridTemplate: 'auto 1fr/1fr',
		overflow: 'hidden',
		position: 'relative'
	},
	list: {
		listStyle: 'none',
		padding: '0 8px 20px',
		margin: 'initial',
		overflow: 'auto'
	},
	pronounced: {
		width: 36, height: 36,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: '1px solid lightgray',
		borderRadius: '4px',
		boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
	},
	project: {
		background: 'white',
		padding: 16, margin: '10px 0',
		borderRadius: '4px',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		display: 'grid',
		gridTemplate: 'auto 1fr/auto 1fr repeat(3, auto)',
		gridGap: '8px 16px',
		'& div:first-child': {
			width: 100,
			height: 100,
			gridRow: 'span 2',
			alignSelf: 'center',
			'& img': {
				boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
				borderRadius: '4px'
			}
		},
		'& pre': {
			margin: 'initial'
		},
		'& span': {
			gridRow: '1/span 2',
			alignSelf: 'center',
			cursor: 'pointer'
		},
		'& .delete': {
			gridColumn: '3',
			color: '#dc3545',
			extend: 'pronounced'
		},
		'& .edit': {
			gridColumn: '4',
			color: '#007bff',
			extend: 'pronounced'
		},
		'& .drag': {
			gridColumn: '5',
			cursor: 'move',
			color: '#343a40'
		}
	},
	add: {
		width: 56, height: 56,
		borderRadius: '50%',
		color: 'white',
		background: '#17a2b8',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		position: 'absolute',
		right: 10, bottom: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer'
	},
	action: {
		justifySelf: 'end',
		alignSelf: 'center'
	},
	save: {
		background: '#28a745',
		color: 'white'
	},
	reset: {
		background: '#6c757d',
		color: 'white',
		marginRight: '10px'
	}
}