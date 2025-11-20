'use client'

import Link from 'next/link'
import { FC } from 'react'

import { FAQS } from '@/shared/constants'
import { Section } from '@/shared/ui'

const HelpPage: FC = () => {
	return (
		<Section className='mt-10 flex grow flex-col space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Help & FAQ</h1>
				<p className='text-secondary'>
					Here you can find answers to the most common questions. If you need further
					assistance, feel free to{' '}
					<Link href='/contact' className='underline hover:no-underline'>
						contact our support team
					</Link>
					.
				</p>
			</div>

			<div className='space-y-4'>
				{FAQS.map((faq, idx) => (
					<div key={idx} className='bg-card border-muted-secondary rounded-lg border p-4'>
						<h2 className='text-secondary font-semibold'>{faq.question}</h2>
						<p className='text-secondary-foreground mt-1'>{faq.answer}</p>
					</div>
				))}
			</div>

			<div className='mt-6'>
				<h2 className='mb-2 text-xl font-semibold'>Quick Links</h2>
				<ul className='text-secondary list-inside list-disc space-y-1'>
					<li>
						<Link href='/groups' className='underline hover:no-underline'>
							Go to Groups
						</Link>
					</li>
					<li>
						<Link href='/projects' className='underline hover:no-underline'>
							Go to Projects
						</Link>
					</li>
					<li>
						<Link href='/settings' className='underline hover:no-underline'>
							Your Profile Settings
						</Link>
					</li>
				</ul>
			</div>
		</Section>
	)
}

export default HelpPage
