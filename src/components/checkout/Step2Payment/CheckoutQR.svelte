<script lang="ts">
    import slcatering_logo from "$lib/assets/slcatering_logo.png";
    // import QrCode from "svelte-qrcode";

    export let qrCodeString: string
</script>

<div class="flex flex-col place-items-center gap-1 p-2 justify-center h-full">
    <img src="{ slcatering_logo }" alt="Logo" class="w-24  object-cover"/>
<!--    <QrCode value="{qrCodeString}" />-->
    <p class="text-center max-w-48 mt-2">Scan the QR code to complete the payment</p>
</div>