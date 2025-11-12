'use client'

import Link from 'next/link'
import { FC } from 'react'

const faqs = [
	{
		question: 'How do I create a project?',
		answer: 'Go to the Projects page, click "Create Project", fill in the required fields, and submit.'
	},
	{
		question: 'Why am I seeing an error on Vercel?',
		answer: 'Make sure Prisma is only used on the server. Client-side code should not import Prisma Client or generated enums directly.'
	},
	{
		question: 'How do I reset my password?',
		answer: 'Navigate to your profile settings and click "Reset Password". Follow the instructions in the email you receive.'
	}
]

const HelpPage: FC = () => {
	return (
		<div className='mx-auto max-w-4xl space-y-6 p-6'>
			<h1 className='text-3xl font-bold'>Help & FAQ</h1>
			<p className='text-gray-500'>
				Here you can find answers to the most common questions. If you need further
				assistance, feel free to{' '}
				<Link href='/contact' className='text-blue-500 underline'>
					contact our support team
				</Link>
				.
			</p>

			<section className='space-y-4'>
				{faqs.map((faq, idx) => (
					<div key={idx} className='rounded-lg border bg-gray-50 p-4'>
						<h2 className='font-semibold'>{faq.question}</h2>
						<p className='mt-1 text-gray-600'>{faq.answer}</p>
					</div>
				))}
			</section>

			<section className='mt-6'>
				<h2 className='mb-2 text-xl font-semibold'>Quick Links</h2>
				<ul className='list-inside list-disc space-y-1 text-blue-500'>
					<li>
						<Link href='/projects'>Go to Projects</Link>
					</li>
					<li>
						<Link href='/profile'>Your Profile Settings</Link>
					</li>
					<li>
						<Link href='/contact'>Contact Support</Link>
					</li>
				</ul>
			</section>
		</div>
	)
}

export default HelpPage
