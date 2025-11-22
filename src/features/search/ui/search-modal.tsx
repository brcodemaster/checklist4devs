'use client'

import { Boxes, ChevronDown, Search, Users } from 'lucide-react'
import Link from 'next/link'

import { DialogClose, Input } from '@/shared/ui'

import { useSearch } from '../model'

export const SearchModal: React.FC = () => {
	const { onChange, groups, projects, debouncedValue, isLoading, hasQuery, hasResults } =
		useSearch()

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
				{!hasQuery && (
					<p className='text-secondary-foreground flex h-20 items-center justify-center'>
						Start typing to search…
					</p>
				)}

				{hasQuery && isLoading && (
					<p className='text-secondary-foreground flex h-20 items-center justify-center'>
						Searching for &quot;{debouncedValue}&quot;
					</p>
				)}

				{hasQuery && !isLoading && hasResults && (
					<>
						{projects?.length > 0 && (
							<ul>
								<li className='font-ibm text-secondary-foreground mb-1 p-1 px-2 text-sm'>
									Projects
								</li>

								{projects.map(p => (
									<li
										key={p.id}
										className='hover:bg-muted-secondary w-full rounded-sm p-1 px-2'
									>
										<DialogClose asChild>
											<Link
												href={`/projects/${p.id}`}
												className='flex w-full items-center justify-between gap-2'
											>
												<span className='flex items-center gap-2'>
													<Boxes className='size-4 stroke-white' />{' '}
													{p.name}
												</span>
												<ChevronDown className='size-4 -rotate-90 stroke-white' />
											</Link>
										</DialogClose>
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
										<DialogClose asChild>
											<Link
												href={`/groups/${g.id}`}
												className='flex w-full items-center justify-between gap-2'
											>
												<span className='flex items-center gap-2'>
													<Users className='size-4 stroke-white' />{' '}
													{g.name}
												</span>
												<ChevronDown className='size-4 -rotate-90 stroke-white' />
											</Link>
										</DialogClose>
									</li>
								))}
							</ul>
						)}
					</>
				)}

				{hasQuery && !isLoading && !hasResults && (
					<p className='text-secondary-foreground flex h-20 items-center justify-center'>
						Results for &quot;{debouncedValue}&quot; not found
					</p>
				)}
			</div>
		</>
	)
}
