export default {
	container: {
		display: 'inline-grid',
		gridTemplate: 'auto/auto 1fr',
		gridGap: '8px',
		'& input, & textarea': {
			border: '1px solid #ced4da',
			borderRadius: '4px',
			fontSize: '1em',
			lineHeight: '1.5em',
			padding: '0.5em 1em',
			width: 'initial',
			height: 'initial'
		},
		'& textarea': {
			minWidth: 300
		},
		'& span': {
			display: 'flex',
			alignItems: 'center'
		}
	}
}