import { GroupsWithProjects } from '@/widgets/groups-with-projects'

import { Section } from '@/shared/ui'

export default function Page() {
	return (
		<Section className='mt-10'>
			<div>
				<h2 className='text-2xl font-normal'>All public groups & projects</h2>
			</div>

			<div className='mt-10 flex flex-col'>
				<GroupsWithProjects />
			</div>
		</Section>
	)
}
