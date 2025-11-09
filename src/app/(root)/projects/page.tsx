import { MyProjects } from '@/widgets/my-projects/ui'

import { Section } from '@/shared/ui'

export default function Page() {
	return (
		<Section className='flex grow flex-col'>
			<div className='mt-10'>
				<h2 className='text-2xl font-normal'>My projects</h2>
			</div>

			<MyProjects />
		</Section>
	)
}
