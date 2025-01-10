<script lang="ts">
	import { page } from '$app/stores';

	const emojis: Record<number, string> = {
		400: '🤔',
		420: '🌿',
		500: '💥',
		404: '🔍',
		403: '🔒',
		401: '🔑'
	};
</script>

<div class="w-screen h-screen flex flex-row justify-center place-items-center gap-10">
	<div class="flex flex-col gap-24">
		<div class="font-bold flex flex-col place-items-center gap-2">
		<span style="font-size: 5em">
			{#if emojis[$page.status] === undefined}
				🤔
			{:else}
				{emojis[$page.status]}
			{/if}
		</span>
			<div class="text-orange-sig text-6xl">
				{$page.status}
			</div>
			<div class="text-4xl">
				{$page.error?.message}
			</div>
		</div>

		<div class="flex flex-col place-items-center text-xl">
			{#if $page.status === 404}
				<div>Makan ayam sambel ijo</div>
				<div>Cari apa hayooo?</div>
			{:else}
				<div>Makan Indomie pake telor</div>
				<div>Kabarin ya ada error</div>
			{/if}
			<a href="/" class="btn btn-primary hovered-bg-orange-sig bg-orange-sig text-white p-4 rounded-xl text-base font-semibold mt-8">
				Back to Home
			</a>
		</div>
	</div>
</div>
