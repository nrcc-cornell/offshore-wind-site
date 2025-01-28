<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div>Header</div>
{@render children()}
<div>Footer</div>
