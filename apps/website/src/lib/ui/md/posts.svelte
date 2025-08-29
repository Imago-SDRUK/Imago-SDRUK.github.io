<script lang="ts">
	let { title, subtitle, content, children } = $props();
	console.log(title, subtitle, content);
</script>

<h1>{title}</h1>
<h1>{title}</h1>
<h1>{title}</h1>
<h1>{title}</h1>
<h1>{title}</h1>
<h1>{title}</h1>
{@render children()}
