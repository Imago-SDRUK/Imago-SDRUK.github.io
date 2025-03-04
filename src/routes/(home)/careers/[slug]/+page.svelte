<script lang="ts">
	import CareersSection from '$lib/ui/sections/careers_section.svelte'
	let { data } = $props()
</script>

<CareersSection career={data.jobs}></CareersSection>
