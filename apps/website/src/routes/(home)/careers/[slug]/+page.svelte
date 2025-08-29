<script lang="ts">
	import CareersSection from '$lib/ui/sections/careers_section.svelte'
	import Seo from '$lib/ui/utils/seo.svelte'
	let { data } = $props()
</script>

<Seo
	title={data.jobs.title}
	description={String(data.jobs.content)}
	image={`https://imago.ac.uk/ui/imago_logo.png`}
></Seo>

<CareersSection career={data.jobs}></CareersSection>
