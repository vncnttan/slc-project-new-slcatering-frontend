<script lang="ts">
    import slcatering_logo from "$lib/assets/slcatering_logo.png";
    import QRCode from '@castlenine/svelte-qrcode';
    import {fade} from 'svelte/transition';


    export let qrCodeString: string
</script>

<div class="flex flex-col place-items-center gap-1 p-2 justify-center h-full">
    <img src="{ slcatering_logo }" alt="Logo" class="w-24  object-cover"/>
    {#if qrCodeString !== ""}
        <QRCode data="{qrCodeString}" />

    {:else}
        <div in:fade={{ delay: 100 }}
             class="w-64 h-60 flex flex-row justify-center items-center animate-pulse bg-gray-200 m-2">
        </div>
    {/if}

    <!-- TODO: Else, loading skeleton -->
    <p class="text-center max-w-48 mt-2">Scan the QR code to complete the payment</p>
</div>