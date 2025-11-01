import { PanelLeftDashed } from 'lucide-react'

import { Button } from '@/shared/ui'

export const ToggleSidebarButton: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
	return (
		<Button
			variant='ghost'
			className='hover:bg-muted-secondary group/button flex w-fit justify-start px-3 duration-200'
			onClick={handleClick}
		>
			<PanelLeftDashed className='text-secondary-foreground size-4 duration-200 group-hover/button:stroke-white' />
		</Button>
	)
}
