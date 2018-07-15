export const FADE_IN = 'FADE_IN';
export const FADE_OUT = 'FADE_OUT';

export default {
	container: {
		opacity: ({animate}) => animate === FADE_IN ? 1 : 0,
		display: ({visible, display}) => visible ? display : 'none',
		transition: ({duration = '0.7s'}) => `all ${duration} ease-in-out`
	}
}