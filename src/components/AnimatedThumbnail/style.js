export default {
	image: {
		objectFit: 'cover',
		transform: 'initial',
		position: 'absolute',
		boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
		width: '100%', height: '100%',
		top: 0, left: 0,
		transition: 'all 0.5s, opacity 0.3s',
		display: ({animate}) => animate ? 'initial' : 'none',
		opacity: ({opacity}) => opacity
	},
	animation: ({style}) => style
}