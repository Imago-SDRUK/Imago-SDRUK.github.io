<script lang="ts">
	import AboutSection from '$lib/ui/sections/about_section.svelte'
	let { data } = $props()
</script>

<AboutSection team_members={data.team_members}></AboutSection>
