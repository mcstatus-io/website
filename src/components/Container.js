export default function Container({ children, className = '', noMargin = false }) {
	return (
		<div className={`container mx-auto ${noMargin ? '' : 'my-12 lg:my-24'} px-4 ${className}`}>
			{children}
		</div>
	);
}