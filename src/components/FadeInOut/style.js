export const FADE_IN = 'FADE_IN';
export const FADE_OUT = 'FADE_OUT';

export default {
	container: {
		opacity: ({animate}) => animate === FADE_IN ? 1 : 0,
		display: ({visible, display}) => visible ? display : 'none',
		transition: 'all 0.7s ease-in-out'
	}
}