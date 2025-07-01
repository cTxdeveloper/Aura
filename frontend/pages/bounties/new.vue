<template>
  <div class="container mx-auto max-w-3xl">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold">Create a New Bounty</h1>
      <p class="text-text-secondary mt-2">Define the connection you need. Clarity is key to attracting the right Connectors.</p>
    </div>
    <BountyForm @success="onSuccess" />
  </div>
</template>

<script setup>
const router = useRouter();

function onSuccess(newBounty) {
  // Redirect to the newly created bounty page
  router.push(`/bounties/${newBounty._id}`);
}
</script>