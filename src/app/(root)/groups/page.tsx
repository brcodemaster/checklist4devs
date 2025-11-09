import { MyGroups } from '@/widgets/my-groups'

import { Section } from '@/shared/ui'

export default function Page() {
	return (
		<Section className='flex grow flex-col'>
			<div className='mt-10'>
				<h2 className='text-2xl font-normal'>My groups</h2>
			</div>

			<MyGroups />
		</Section>
	)
}
