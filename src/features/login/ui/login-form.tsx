import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	InputPassword
} from '@/shared/ui'

import { useLogin } from '../model'

export const LoginForm: React.FC = () => {
	const { form, handleSubmit } = useLogin()

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='p-0'>
								<FormLabel className='text-sm'>Email</FormLabel>
								<FormControl>
									<Input
										className='placeholder:text-secondary-foreground/50 bg-input h-9 placeholder:text-sm'
										placeholder='you@example.com'
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='p-0'>
								<FormLabel className='text-sm'>Password</FormLabel>
								<FormControl>
									<InputPassword
										className='placeholder:text-secondary-foreground/50 bg-input h-9 placeholder:text-sm'
										placeholder='••••••••••'
										autoComplete='off'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button className='mt-10 w-full'>Sign in</Button>
			</form>
		</Form>
	)
}
