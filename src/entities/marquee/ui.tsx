export const Marquee: React.FC = () => {
	return (
		<div className='bg-background w-full overflow-hidden whitespace-nowrap'>
			<p className='animate-marquee font-ibm inline-block text-xs'>
				For stable performance, we recommend: 1 group, 1 project, up to 50 tasks. Following
				this helps avoid overload and ensures a smooth experience with the app.
			</p>
		</div>
	)
}
