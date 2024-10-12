<script>
    import ProgressBar from "./ProgressBar.svelte";
    export let currentStep = 1;
</script>

<div class="bg-red-sig-gradient w-full min-h-screen">
    <div class="w-full h-full min-h-screen bg-layer-cutout xl:pt-[14vh]">
        <div class="w-full h-full bg-white container mx-auto md:p-16 lg:px-48 xl:rounded-t-xl min-h-screen xl:min-h-[86vh]">
            <div class="container flex flex-col gap-16 font-karla">
                <ProgressBar currentStep={currentStep}/>
                <slot/>
            </div>
        </div>
    </div>
</div>