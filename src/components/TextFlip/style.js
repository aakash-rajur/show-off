export const TEXT_FIRST = 'TEXT_FIRST';
export const TEXT_SECOND = 'TEXT_SECOND';

function getOpacity(part) {
	return ({vector, current}) =>
		current === part ? 1 : 0
}

export default {
	container: {
		display: 'grid',
		gridTemplate: '1fr/1fr'
	},
	animate: {
		gridRow: '1',
		gridColumn: '1',
		transition: 'all 0.3s'
	},
	first: {
		extend: 'animate',
		transform: ({vector, current}) =>
			`translateY(-${current !== TEXT_FIRST ? vector : 0})`,
		opacity: getOpacity(TEXT_FIRST)
	},
	second: {
		extend: 'animate',
		transform: ({vector, current}) =>
			`translateY(${current !== TEXT_SECOND ? vector : 0})`,
		opacity: getOpacity(TEXT_SECOND)
	}
}