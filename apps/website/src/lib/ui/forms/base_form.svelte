<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit'
	let className = ''
	export let enctype:
		| 'application/x-www-form-urlencoded'
		| 'multipart/form-data'
		| 'text/plain'
		| null
		| undefined = undefined
	export { className as class }
	export let title: string | undefined = undefined
	export let action = ''
	export let updated:
		| ((res: {
				form: Readonly<SuperValidated<Record<string, unknown>, unknown, Record<string, unknown>>>
		  }) => Promise<void>)
		| undefined = undefined
	export let submit:
		| ((params: {
				action: URL
				formData: FormData
				jsonData: (data: Record<string, unknown>) => void
				submitter: HTMLElement | null
				cancel: () => void
				controller: AbortController
				validators: (
					validators:
						| false
						| ValidationAdapter<Partial<Record<string, unknown>>, Record<string, unknown>>
				) => void
				formElement: HTMLFormElement
		  }) => unknown)
		| undefined = undefined
	export let error:
		| ((result: {
				type: 'error'
				status?: number | undefined
				error:
					| App.Error
					| Error
					| {
							message: string
					  }
		  }) => unknown)
		| undefined = undefined
	export let result:
		| ((event: {
				result: ActionResult
				formEl: HTMLFormElement
				formElement: HTMLFormElement
				cancel: () => void
		  }) => unknown)
		| undefined = undefined
	export const superform = superForm(data, {
		// dataType: 'json',
		resetForm: reset_form,
		invalidateAll: invalidate_all,
		onSubmit(p) {
			if (submit) {
				submit(p)
			}
		},
		onUpdated(res) {
			if (updated) {
				updated(res)
			}
		},
		onError(err) {
			if (error) {
				error(err.result)
			}
		},
		onResult(e) {
			if (result) {
				result(e)
			}
		}
	})
	const { form, message, delayed, errors, allErrors, enhance } = superform
	const getSchemaKeys = (schema: Collection | undefined) => {
		if (schema === undefined) return []
		return schema.hidden_keys
	}
	let fields = getFormFields(data.data, [...hidden_keys, ...getSchemaKeys(schema)], enums)
</script>

<form class={className} {action} method="post" {enctype} use:enhance>
	<slot name="title" />
	{#if title}
		<Title size="small" {title}></Title>
	{/if}
	{#if $message}
		<FormError errors={$message}></FormError>
	{/if}
	{#if $errors?._errors}
		<FormError errors={$errors._errors[0]}></FormError>
	{/if}
	<slot name="dynamic" {superform} {schema} />
	{#if auto_fields}
		{#each fields as field, i}
			{#if field.type === 'date'}
				<FormDateInput
					{schema}
					design={2}
					{superform}
					label={field.key.replaceAll('_', ' ')}
					key={field.key}
				></FormDateInput>
			{/if}
			{#if field.type === 'text'}
				<FormTextInput
					{schema}
					options={options.filter((o) => o.key === field.key)[0]}
					{i}
					design={2}
					{superform}
					label={field.key.replaceAll('_', ' ')}
					key={field.key}
					type={field.type}
				></FormTextInput>
			{/if}
			{#if field.type === 'password'}
				<FormTextInput
					{schema}
					options={options.filter((o) => o.key === field.key)[0]}
					{i}
					design={2}
					{superform}
					label={field.key.replaceAll('_', ' ')}
					key={field.key}
					type={field.type}
				></FormTextInput>
			{/if}

			{#if field.type === 'number'}
				<FormTextInput
					{i}
					{schema}
					design={2}
					{superform}
					label={field.key.replaceAll('_', ' ')}
					key={field.key}
					type="number"
				></FormTextInput>
			{/if}
			{#if field.type === 'boolean'}
				<FormCheckboxInput
					design={2}
					form={superform}
					label={field.key.replaceAll('_', ' ')}
					key={field.key}
				></FormCheckboxInput>
			{/if}
			{#if field.type === 'selection'}
				<FormSelection
					{schema}
					key={field.key}
					design={2}
					{superform}
					label={field.key.replaceAll('_', ' ')}
					options={field?.options}
				></FormSelection>
			{/if}
			{#if $debug}
				<pre>{JSON.stringify(field, null, 2)}</pre>
			{/if}
		{/each}
	{/if}
	<slot
		{schema}
		{superform}
		form={$form}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.landing-form {
		width: min(100% - 1rem, 500px);
		margin-inline: auto;
		/* padding: 0.3rem 0; */
	}
</style>
