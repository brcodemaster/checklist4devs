'use client'

import { Boxes, ChevronDown, Search, User, Users } from 'lucide-react'
import Link from 'next/link'

import { Input } from '@/shared/ui'

import { useSearch } from '../model'

export const SearchModal: React.FC = () => {
	const { onChange, results } = useSearch()
	const [users, projects, groups] = results

	return (
		<>
			<div className='border-muted-secondary bg-background relative top-0 flex h-14 w-full items-center justify-start border-b p-4 md:p-6'>
				<Search className='stroke-secondary-foreground size-5' />
				<Input
					placeholder='Enter search value'
					className='text-md w-full border-none focus-visible:border-none focus-visible:ring-0'
					onChange={e => onChange(e.target.value)}
				/>
			</div>

			<div className='max-h-64 space-y-3 overflow-y-auto p-4 md:p-6'>
				{users?.length > 0 && (
					<ul>
						<li className='font-ibm text-secondary-foreground mb-1 p-1 px-2 text-sm'>
							Developers
						</li>
						{users.map(u => (
							<li
								key={u.id}
								className='hover:bg-muted-secondary flex w-full items-center justify-between rounded-sm p-1 px-2'
							>
								<Link
									href={`/users/${u.id}`}
									className='flex w-full items-center gap-2'
								>
									<User className='size-4 stroke-white' />
									{u.userName}
								</Link>
								<ChevronDown className='size-4 -rotate-90 stroke-white' />
							</li>
						))}
					</ul>
				)}

				{projects?.length > 0 && (
					<ul>
						<li className='font-ibm text-secondary-foreground mb-1 p-1 px-2 text-sm'>
							Projects
						</li>
						{projects.map(p => (
							<li
								key={p.id}
								className='hover:bg-muted-secondary flex w-full items-center justify-between rounded-sm p-1 px-2'
							>
								<Link
									href={`/projects/${p.id}`}
									className='flex w-full items-center gap-2'
								>
									<Boxes className='size-4 stroke-white' /> {p.name}
								</Link>{' '}
								<ChevronDown className='size-4 -rotate-90 stroke-white' />
							</li>
						))}
					</ul>
				)}

				{groups?.length > 0 && (
					<ul>
						<li className='font-ibm text-secondary-foreground mb-1 p-1 px-2 text-sm'>
							Groups
						</li>
						{groups.map(g => (
							<li
								key={g.id}
								className='hover:bg-muted-secondary flex w-full items-center justify-between rounded-sm p-1 px-2'
							>
								<Link
									href={`/groups/${g.id}`}
									className='flex w-full items-center gap-2'
								>
									<Users className='size-4 stroke-white' />
									{g.name}
								</Link>{' '}
								<ChevronDown className='size-4 -rotate-90 stroke-white' />
							</li>
						))}
					</ul>
				)}

				{!users.length && !projects.length && !groups.length && (
					<p className='text-muted-foreground text-secondary-foreground flex h-20 items-center justify-center'>
						Search for result
					</p>
				)}
			</div>
		</>
	)
}
